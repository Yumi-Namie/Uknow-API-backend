import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, Optional, UnauthorizedException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { PurchaseService } from '../purchase/purchase.service';
import { validate } from 'class-validator';


@Injectable()
export class CourseService {
  // private purchaseService: PurchaseService;

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private userService: UserService,
    private purchaseService: PurchaseService,
  ) {}

  setPurchaseService(purchaseService: PurchaseService) {
    this.purchaseService = purchaseService;
  }
  
  async createCourse(createCourseDto: CreateCourseDto, user: User): Promise<Course> {
    const { title, description, difficulty, topic, content } = createCourseDto;
  
    const validationErrors = await validate(createCourseDto);
    if (validationErrors.length > 0) {
      throw new ConflictException('Missing required field(s).');
    }
  
    // Check if a course with the same description already exists
    const existingCourseWithDescription = await this.courseRepository.findOne({ where: { description } });
    if (existingCourseWithDescription) {
      throw new ConflictException('A course with the same description already exists.');
    }
    const existingCourseWithTitle = await this.courseRepository.findOne({ where: { title } });
    if (existingCourseWithTitle) {
      throw new ConflictException('A course with the same title already exists.');
    }
    const existingCourseWithContent = await this.courseRepository.findOne({ where: { content } });
    if (existingCourseWithContent) {
      throw new ConflictException('A course with the same content already exists.');
    }
  
    const course = new Course();
    course.title = title;
    course.description = description;
    course.difficulty = difficulty;
    course.topic = topic;
    course.content = content;
    course.creator = user; // Assign the current user as the creator of the course
  
    return this.courseRepository.save(course);
  }
  

  //Todo los cursos pero sin contenido (publico)
  async findAll(): Promise<Course[]> {
    try {
  
        const courses = await this.courseRepository.find({
          where: { approved: true },
          order: { rating: 'DESC' },
          select: ['title', 'topic', 'price', 'rating'],
        });
  
        if (!courses || courses.length === 0) {
          throw new NotFoundException('No approved courses found.');
        }
  
        return courses;
      }
     catch (error) {
      throw new Error('Error while fetching the courses.');
    }
  } 


  // Curso sin contenido (publico)
  async findOne(courseId: number): Promise<Course> {
   
      const course = await this.courseRepository.findOne({ where: { courseId }, select: ['courseId','title','topic', 'price', 'rating', 'description', 'stars', 'comments'] });
      
      if (!course) {
        throw new NotFoundException(`Course ${courseId} not found.`);
      }
      return course;
  }

  async update(courseId: number, updateCourseDto: UpdateCourseDto, id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { courseId }, relations: ['creator'] });

    if (!course) {
      throw new NotFoundException('Course not found.');
    }
  
    if (course.creator.id !== id) {
      throw new UnauthorizedException('You are not authorized to update this course.');
    }
  
    const allowedProperties = ['title', 'description', 'topic', 'content', 'difficulty'];
  
    Object.keys(updateCourseDto).forEach((property) => {
      if (!allowedProperties.includes(property)) {
        throw new BadRequestException(`Updating the '${property}' field is not allowed.`);
      }
    });
  
    // Perform the update on the course entity
    course.title = updateCourseDto.title;
    course.description = updateCourseDto.description;
    course.topic = updateCourseDto.topic;
    course.content = updateCourseDto.content;
    course.difficulty = updateCourseDto.difficulty;
  
    const updatedCourse = await this.courseRepository.save(course);
  
    return updatedCourse;
  }
  


  async removeCoursebyAdmin(courseId: number): Promise<boolean> {

    const course = await this.courseRepository.findOne({ where: { courseId } });

    if (!course) {
      throw new NotFoundException(`Course with ID '${courseId}' not found`);
    } 

    const coursePurchaseTotal = await this.purchaseService.countCoursePurchases(courseId);
    if (coursePurchaseTotal > 0) {
      throw new BadRequestException('This course has buyers and cannot be deleted.')
    }

    const result = await this.courseRepository.delete(courseId);

    if (result.affected === 0) {
      throw new InternalServerErrorException('Failed to delete course');
    }

    return true;
  }

  //user (author) can remove own course if no one has bought it
  async deleteCourseIfNoPurchases(courseId: number, userId: number): Promise<void> {

    const course = await this.courseRepository.findOne({where: {courseId}, relations: ['creator'] });
    const purchaseCount = await this.purchaseService.countCoursePurchases(courseId);

    if (!course) {
      throw new NotFoundException(`Course with ID '${courseId}' not found.`);
    }

    if (purchaseCount === 0 && course.creator.id === userId) {
      await this.courseRepository.delete({ courseId, creator: { id: userId } });
      
    } else {
      throw new ForbiddenException('This course cannot be deleted.');
    }
  }

  // !! COURSES NOT APPROVED
  async getAllUnapproved(): Promise<Course[]> {
    try {
      const unapprovedCourses = await this.courseRepository.createQueryBuilder('course')
        .where('course.approved = :approved', { approved: false })
        .getMany();
      return unapprovedCourses;
    } catch (error) {
      throw new Error('Error while fetching unapproved courses.');
    }
  }

  async getUnapprovedCourseById(courseId: number): Promise<Course> {
    try {
      const unapprovedCourse = await this.courseRepository.createQueryBuilder('course')
        .where('course.courseId = :courseId', { courseId })
        .andWhere('course.approved = :approved', { approved: false })
        .getOne();
  
      if (!unapprovedCourse) {
        throw new NotFoundException(`Unapproved course with ID '${courseId}' not found.`);
      }
  
      return unapprovedCourse;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error while fetching unapproved course.');
    }
  }
  
  async updateApproval(courseId: number, approval: boolean): Promise<Course> {
    const course = await this.courseRepository.findOne(
      { 
        where: { courseId },
        relations: ['creator'],
      });
    
    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    if (course.approved) {
      throw new ConflictException('Course has already been approved.');
    }

    course.approved = approval;
    const updatedCourse = await this.courseRepository.save(course);

    //Llama a la función updateUserWallet del UserService
    await this.userService.updateUserWallet(course.creator.id); 

    return updatedCourse;
  }

  async findUserCourses(userId: number): Promise<Course[]> {
    const courses = await this.courseRepository
      .createQueryBuilder('course')
      .where('course.creatorId = :userId', { userId })
      .getMany();
  
    if (courses.length === 0) {
      throw new NotFoundException('No courses found for the user.');
    }
     
    return courses;
  }
  


  async searchByKeyword(keyword: string): Promise<Course[]> {
    try {
      const courses = await this.courseRepository.createQueryBuilder('course')
        .select(['course.title', 'course.topic', 'course.price', 'course.rating'])
        .where('course.content LIKE :keyword', { keyword: `%${keyword}%` })
        .getMany();
  
      return courses;
    } catch (error) {
      throw new NotFoundException('No courses found.');
    }
  }

  async addCommentToCourse(courseId: number, userId: number, comment: string): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { courseId } });
  
    if (!course) {
      throw new NotFoundException(`Course ${courseId} not found.`);
    }
  
    const existingComment = course.comments?.find((c) => c.userId === userId);
    const hasPurchased = await this.purchaseService.hasPurchasedCourse(courseId, userId);
  
    if (!hasPurchased) {
      throw new ForbiddenException('You can only comment on courses you have purchased.');
    }
  
    if (course.comments === null) {
      course.comments = [];
    }
  
    if (existingComment) {
      throw new BadRequestException('You have already commented on this course.');
    }
  
    course.comments.push({ userId, value: comment });
  
    return this.courseRepository.save(course);
  }
  
  // ** To update the course stars 
  async updateCourseStars(courseId: number, userId: number, stars: number): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { courseId } });
    if (!course) {
      throw new Error('Course not found');
    }
  
    const hasPurchased = await this.purchaseService.hasPurchasedCourse(courseId, userId);
  
    if (!hasPurchased) {
      throw new ForbiddenException('You can only rate courses you have purchased.');
    }
  
    const isReviewed = await this.purchaseService.isCourseReviewed(courseId, userId);
  
    if (isReviewed) {
      throw new BadRequestException('You have already rated this course.');
    }
  
    // Update the course stars
    course.stars = [{ value: stars }];
    await this.courseRepository.save(course);
  
    const updatedCourse = await this.calculateCourseRating(courseId);
    return updatedCourse;
  }

  // ** Calculate the new value of the rating field when a new star is added 

  async calculateCourseRating(courseId: number): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { courseId } });
    if (!course) {
      throw new Error('Course not found');
    }
  
    const totalRatings = course.stars?.length || 0;
  
    if (totalRatings === 0) {
      course.rating = 0;
    } else {
      const sumRatings = course.stars.reduce((total, star, index) => {
        if (index < 4) {
          return total + 4.8;
        }
        return total + star.value;
      }, 0);
  
      const averageRating = sumRatings / totalRatings;
      course.rating = parseFloat(averageRating.toFixed(1));
    }
  
    if (course.rating < 3) {
      course.price = 100; // Set price to 100 if rating is below 3
    } else {
      course.price = 200; // Set price back to default 200 if rating is 3 or above
    }
  
    await this.courseRepository.save(course);
  
    return course;
  }
}

  // async updateCourseStar(courseId: number, star: number, id: number): Promise<Course> {
  //   const course = await this.courseRepository
  //     .createQueryBuilder('course')
  //     .leftJoinAndSelect('course.buyers', 'buyer')
  //     .where('course.courseId = :courseId', { courseId })
  //     .getOne();
  
  //   // Check if the user has bought the course
  //   const userHasBoughtCourse = course.buyers.some((buyer) => buyer.id === id);
  //   if (!userHasBoughtCourse) {
  //     throw new UnauthorizedException('User has not bought the course.');
  //   }
  
  //   course.star.push(star); // Add the new star to the array
  //   await this.courseRepository.save(course); // Save the updated course to trigger the @BeforeUpdate hook
  //   return course;
  // }
 
  /*  async updateCourseStar(courseId: number, star: number, id: number): Promise<Course> {
    const course = await this.courseRepository.findOne(courseId, { relations: ['buyers'] });
  
    // Check if the user has bought the course
    const userHasBoughtCourse = course.buyers.some((buyer) => buyer.id === id);
    if (!userHasBoughtCourse) {
      throw new UnauthorizedException('User has not bought the course.');
    }
  
    course.star.push(star); // Add the new star to the array
    await this.courseRepository.save(course); // Save the updated course to trigger the @BeforeUpdate hook
    return course;
  } */
  
  /*  async updateCourseStar(courseId: number, star: number): Promise<Course> {*/
