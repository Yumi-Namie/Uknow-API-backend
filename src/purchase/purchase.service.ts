import { BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { User } from '../user/entities/user.entity';
import { CourseService } from '../course/course.service';
import { Course } from '../course/entities/course.entity';

@Injectable()
export class PurchaseService {

  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
 
  async makePurchase(
    createPurchaseDto: CreatePurchaseDto,
    user: User,
  ): Promise<Purchase> {
    const { courseId } = createPurchaseDto;

    // const course = await this.courseService.findOne(courseId);
    const course: Course = await this.courseRepository.findOne({where: {courseId}});

    if (!course) {
      throw new NotFoundException(`Course ${courseId} not found.`);
    }

    if (user.wallet < course.price) {
      throw new BadRequestException('Insufficient balance to purchase the course.');
    }

    //Update user wallet (-course price)
    user.wallet -= course.price;
    await this.userRepository.save(user);

    // update the price of the course (-1%)
    course.price = course.price * 0.99;
    await this.courseRepository.save(course);

    const existingPurchase = await this.purchaseRepository.findOne({
      where: {
        buyer: { id: user.id },
        course: { courseId: courseId },
      },
    });

  
    if (existingPurchase) {
      throw new ConflictException('You have already purchased this course.');
    }

    const purchase = new Purchase();
    purchase.buyer = user;
    purchase.course = course;
  
    return this.purchaseRepository.save(purchase);
  }

  async countCoursePurchases(courseId: number): Promise<number> {
    const coursePurchaseTotal = await this.purchaseRepository
      .createQueryBuilder('purchase')
      .where('purchase.courseId = :courseId', { courseId })
      .getCount();

    return coursePurchaseTotal;
  }

  //All courses
  async getUserPurchasedCourses(user: User): Promise<Course[]> {
    const purchases = await this.purchaseRepository.find({
      where: {
        buyer: { id: user.id },
      },
      relations: ['course'],
    });

    if (purchases.length === 0) {
      throw new NotFoundException('No purchased courses found for the user.');
    }

    return purchases.map((purchase) => purchase.course);
  }

  //Just one course
  async getUserPurchasedCourse(user: User, courseId: number): Promise<Course> {
    const purchase = await this.purchaseRepository.findOne({
      where: {
        buyer: { id: user.id },
        course: { courseId },
      },
      relations: ['course'],
    });

    if (!purchase) {
      throw new NotFoundException('The user has not purchased this course.');
    }

    return purchase.course;
  }
  
  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }

  async hasPurchasedCourse(courseId: number, userId: number): Promise<boolean> {
    const purchase = await this.purchaseRepository.findOne({
      where: {
        buyer: { id: userId },
        course: { courseId },
      },
    });
    return !!purchase;
  }
  async isCourseReviewed(courseId: number, userId: number): Promise<boolean> {
    const purchase = await this.purchaseRepository.findOne({
      where: {
        buyer: { id: userId },
        course: { courseId },
        reviewed: true,
      },
    });
  
    return !!purchase;
  }
  
  }
  