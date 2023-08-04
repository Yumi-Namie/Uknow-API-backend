import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course, courseDifficulty } from './entities/course.entity';
import { PurchaseService } from '../purchase/purchase.service';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { BadRequestException, ConflictException, ForbiddenException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('CourseService', () => {
  let service: CourseService;
  let purchaseService: PurchaseService;

/*   const mockEntityManager = {
    createQueryBuilder: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  };   */

  const mockCourseRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(),
    // calculateCourseRating: jest.fn(),
/*     manager: mockEntityManager
 */  };
  const mockPurchaseService = {
    countCoursePurchases: jest.fn(),
    hasPurchasedCourse: jest.fn(),
    isCourseReviewed: jest.fn(),
  };
  const mockUserService = {
    updateUserWallet:jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: getRepositoryToken(Course),
          useValue: mockCourseRepository,
        },
        {
          provide: PurchaseService,
          useValue: mockPurchaseService
        },
        { provide: UserService,
          useValue: mockUserService
        }
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new course', async () => {
    // Mock the input data
    const createCourseDto = {
      title: 'New Course',
      description: 'Course description',
      difficulty: courseDifficulty.Easy,
      topic: 'Programming',
      content: 'Course content',
      creatorId: 1, // Provide a valid user ID
    };
  
    const user = new User();
    user.id = 1; // Set the user ID
  
    // Mock the course repository's findOne method to return null (no existing course)
    mockCourseRepository.findOne.mockResolvedValueOnce(null);
  
    // Mock the course repository's save method to return the saved course
    const savedCourse = new Course();
    mockCourseRepository.save.mockResolvedValueOnce(savedCourse);
  
    // Call the createCourse method
    const result = await service.createCourse(createCourseDto, user);
  
    // Verify the result
    expect(result).toBe(savedCourse);
    expect(mockCourseRepository.findOne).toHaveBeenCalledTimes(3);
    expect(mockCourseRepository.save).toHaveBeenCalledWith(expect.any(Course));
  });

  it('should throw ConflictException when a course with the same description already exists', async () => {
    const createCourseDto = {
      title: 'New Course',
      description: 'Course description',
      difficulty: courseDifficulty.Easy,
      topic: 'Programming',
      content: 'Course content',
      creatorId: 1,
    };
  
    const user = new User();
    user.id = 1;
  
    // Create an existing course with the same description
    const existingCourse = new Course();
    existingCourse.title = 'New Course 1';
    existingCourse.description = 'Course description';
    existingCourse.difficulty = courseDifficulty.Easy;
    existingCourse.topic = 'Programming 1';
    existingCourse.content = 'Course content 1';
    existingCourse.creator = user;
  
    // Mock the course repository's findOne method to return the existing course
    jest.spyOn(mockCourseRepository, 'findOne').mockResolvedValue(existingCourse);
  
    // Call the createCourse method and expect it to throw a ConflictException
    try {
      await service.createCourse(createCourseDto, user);
      } catch (error){
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toEqual('A course with the same description already exists.');
      }

    expect(mockCourseRepository.findOne).toHaveBeenCalledWith({ where: { description: createCourseDto.description } });
    });  

 it('should throw ConflictException when a course with the same title already exists', async () => {
    const createCourseDto = {
      title: 'New Course',
      description: 'Course description',
      difficulty: courseDifficulty.Easy,
      topic: 'Programming',
      content: 'Course content',
      creatorId: 1,
    };
  
    const user = new User();
    user.id = 1;
  
    // Create an existing course with the same title
    const existingCourse = new Course();
    existingCourse.title = 'New Course';
    existingCourse.description = 'Course description 1';
    existingCourse.difficulty = courseDifficulty.Easy;
    existingCourse.topic = 'Programming';
    existingCourse.content = 'Course content 1';
    existingCourse.creator = user;
  
    // Mock the course repository's findOne method to return the existing course
    jest.spyOn(mockCourseRepository, 'findOne').mockResolvedValueOnce(undefined)
    .mockResolvedValueOnce(existingCourse);
  
    // Call the createCourse method and expect it to throw a ConflictException
    try {
      await service.createCourse(createCourseDto, user);
      } catch (error){
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toEqual('A course with the same title already exists.');
      }

    expect(mockCourseRepository.findOne).toHaveBeenCalledWith({ where: { title: createCourseDto.title } });
    });  

    it('should throw ConflictException when a course with the same content already exists', async () => {
      const createCourseDto = {
        title: 'New Course',
        description: 'Course description',
        difficulty: courseDifficulty.Easy,
        topic: 'Programming',
        content: 'Course content',
        creatorId: 1,
      };
    
      const user = new User();
      user.id = 1;
    
      // Create an existing course with the same title
      const existingCourse = new Course();
      existingCourse.title = 'New Course 1';
      existingCourse.description = 'Course description 1';
      existingCourse.difficulty = courseDifficulty.Easy;
      existingCourse.topic = 'Programming';
      existingCourse.content = 'Course content';
      existingCourse.creator = user;
    
      // Mock the course repository's findOne method to return the existing course
      jest.spyOn(mockCourseRepository, 'findOne').mockResolvedValueOnce(undefined).mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(existingCourse);
    
      // Call the createCourse method and expect it to throw a ConflictException
      try {
        await service.createCourse(createCourseDto, user);
        } catch (error){
          expect(error).toBeInstanceOf(ConflictException);
          expect(error.message).toEqual('A course with the same content already exists.');
        }
  
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({ where: { content: createCourseDto.content } });
      });  

    it('should return all approved courses ordered by rating for all', async () => {
      const mockCourses = [
        { title: 'Course 1', topic: 'Programming', price: 10, rating: 4.5 },
        { title: 'Course 2', topic: 'Design', price: 20, rating: 4.2 },
      ];
      
      jest.spyOn(mockCourseRepository, 'find').mockResolvedValue(mockCourses);
      
      const result = await service.findAll();
      
      expect(mockCourseRepository.find).toHaveBeenCalledWith({
        where: { approved: true },
        order: { rating: 'DESC' },
        select: ['title', 'topic', 'price', 'rating'],
      });
      expect(result).toEqual(mockCourses);
    }); 

    it('should throw NotFoundException if no approved courses found', async () => {
      
      jest.spyOn(mockCourseRepository, 'find').mockResolvedValue([]);
    
      try {
        await service.findAll();
        } catch (error){
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toEqual('Error while fetching the courses.');
        }
      
      expect(mockCourseRepository.find).toHaveBeenCalledWith({
        where: { approved: true },
        order: { rating: 'DESC' },
        select: ['title', 'topic', 'price', 'rating'],
      });
    });

    it('should return the course when it exists', async () => {
      const mockCourse = { courseId: 1, title: 'Course 1', topic: 'Programming', price: 10, rating: 4.5 };
    
      jest.spyOn(mockCourseRepository, 'findOne').mockResolvedValue(mockCourse);
    
      const courseId = 1;
    
      const result = await service.findOne(courseId);
    
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({
        where: { courseId },
        select: ['courseId', 'title', 'topic', 'price', 'rating', 'description', 'stars', 'comments'],
      });
      expect(result).toEqual(mockCourse);
    });

    it('should throw NotFoundException when the course does not exist', async () => {
      jest.spyOn(mockCourseRepository, 'findOne').mockResolvedValue(undefined);
    
      const courseId = 1;

      try {
        await service.findOne(courseId);
        } catch (error){
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`Course ${courseId} not found.`);
        }
    
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({
        where: { courseId },
        select: ['courseId', 'title', 'topic', 'price', 'rating', 'description', 'stars', 'comments'],
      });
    });

    it('should update the course when it exists and user is authorized', async () => {
      const mockCourse = { courseId: 1, title: 'Course 1', topic: 'Programming', creator: { id: 1 } };
      const updateCourseDto = { title: 'Updated Course 1', topic: 'Updated Programming' };
      const id = 1;

      jest.spyOn(mockCourseRepository, 'findOne').mockResolvedValue(mockCourse);
      jest.spyOn(mockCourseRepository, 'save').mockResolvedValue({ ...mockCourse, ...updateCourseDto });

      const result = await service.update(mockCourse.courseId, updateCourseDto, id);

      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({
        where: { courseId: mockCourse.courseId },
        relations: ['creator'],
      });
      expect(mockCourseRepository.save).toHaveBeenCalledWith({
        ...mockCourse,
        ...updateCourseDto,
      });
      expect(result).toEqual({ ...mockCourse, ...updateCourseDto });
    });

    it('should throw NotFoundException when the course does not exist', async () => {
      jest.spyOn(mockCourseRepository, 'findOne').mockResolvedValue(undefined);

      const courseId = 1;
      const updateCourseDto = { title: 'Updated Course 1', topic: 'Updated Programming' };
      const id = 1;

      try {
        await service.update(courseId, updateCourseDto, id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Course not found.`);
      }

      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({
        where: { courseId },
        relations: ['creator'],
      });
    }); 
    it('should throw UnauthorizedException when user is not authorized to update the course', async () => {
      const courseId = 1;
      const updateCourseDto = { title: 'Updated Course 1', topic: 'Updated Programming' };
      const id = 2; // Different user ID than the creator of the course
    
      const mockCourse = {
        courseId: 1,
        title: 'Course 1',
        topic: 'Programming',
        creator: { id: 1 },
      };
    
      jest.spyOn(mockCourseRepository, 'findOne').mockResolvedValue(mockCourse);
    
      try {
        await service.update(courseId, updateCourseDto, id);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toEqual('You are not authorized to update this course.');
      }
    
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({
        where: { courseId },
        relations: ['creator'],
      });
    });

    it('should throw BadRequestException when updating with an invalid property', async () => {
      const courseId = 1;
      const updateCourseDto = { title: 'Updated Course 1', topic: 'Updated Programming', price: 20 };
      const id = 1;
    
      const mockCourse = {
        courseId: 1,
        title: 'Course 1',
        topic: 'Programming',
        creator: { id: 1 },
      };
    
      jest.spyOn(mockCourseRepository, 'findOne').mockResolvedValue(mockCourse);
    
      try {
        await service.update(courseId, updateCourseDto, id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual(`Updating the 'price' field is not allowed.`);
      }
    
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({
        where: { courseId },
        relations: ['creator'],
      });
    });

    it('should remove a course by admin', async () => {
      const courseId = 1;
    
      const mockCourse = {
        courseId: 1,
        title: 'Course 1',
      };
    
      const mockResult = {
        affected: 1,
      };
    
      jest.spyOn(mockCourseRepository, 'findOne').mockResolvedValue(mockCourse);
      jest.spyOn(mockPurchaseService, 'countCoursePurchases').mockResolvedValue(0);
      jest.spyOn(mockCourseRepository, 'delete').mockResolvedValue(mockResult);
    
      const result = await service.removeCoursebyAdmin(courseId);
    
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({ where: { courseId } });
      expect(mockPurchaseService.countCoursePurchases).toHaveBeenCalledWith(courseId);
      expect(mockCourseRepository.delete).toHaveBeenCalledWith(courseId);
      expect(result).toBe(true);
    });

    it('should throw NotFoundException when the course does not exist', async () => {
      const courseId = 1;
    
      jest.spyOn(mockCourseRepository, 'findOne').mockResolvedValue(undefined);
    
      try {
        await service.removeCoursebyAdmin(courseId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Course with ID '${courseId}' not found`);
      }
    
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({ where: { courseId } });
    });

    it('should throw BadRequestException when the course has buyers and cannot be deleted', async () => {
      const courseId = 1;
    
      const mockCourse = {
        courseId: 1,
        title: 'Course 1',
      };
    
      jest.spyOn(mockCourseRepository, 'findOne').mockResolvedValue(mockCourse);
      jest.spyOn(mockPurchaseService, 'countCoursePurchases').mockResolvedValue(1);
    
      try {
        await service.removeCoursebyAdmin(courseId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('This course has buyers and cannot be deleted.');
      }
    
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({ where: { courseId } });
      expect(mockPurchaseService.countCoursePurchases).toHaveBeenCalledWith(courseId);
    });

    it('should throw InternalServerErrorException when failed to delete the course', async () => {
      const courseId = 1;
    
      const mockCourse = {
        courseId: 1,
        title: 'Course 1',
      };
    
      const mockResult = {
        affected: 0,
      };
    
      jest.spyOn(mockCourseRepository, 'findOne').mockResolvedValue(mockCourse);
      jest.spyOn(mockPurchaseService, 'countCoursePurchases').mockResolvedValue(0);
      jest.spyOn(mockCourseRepository, 'delete').mockResolvedValue(mockResult);
    
      try {
        await service.removeCoursebyAdmin(courseId);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toEqual('Failed to delete course');
      }
    
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({ where: { courseId } });
      expect(mockPurchaseService.countCoursePurchases).toHaveBeenCalledWith(courseId);
      expect(mockCourseRepository.delete).toHaveBeenCalledWith(courseId);
    });

    it('should delete the course if no purchases exist', async () => {
      const courseId = 1;
      const creatorId = 1;
    
      const mockCourse = {
        courseId: 1,
        title: 'Course 1',
        creator: {
          id: creatorId,
        },
      };
    
      const mockPurchaseCount = 0;
      const mockDeleteResult = {
        affected: 1,
      };
    
      jest.spyOn(mockCourseRepository, 'findOne').mockResolvedValue(mockCourse);
      jest.spyOn(mockPurchaseService, 'countCoursePurchases').mockResolvedValue(mockPurchaseCount);
      jest.spyOn(mockCourseRepository, 'delete').mockResolvedValue(mockDeleteResult);
    
      await service.deleteCourseIfNoPurchases(courseId, creatorId);
    
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({ where: { courseId } });
      expect(mockPurchaseService.countCoursePurchases).toHaveBeenCalledWith(courseId);
      expect(mockCourseRepository.delete).toHaveBeenCalledWith({ courseId, creator: { id: creatorId } });
    });

    it('should throw NotFoundException when the course does not exist', async () => {
      const courseId = 1;
      const creatorId = 1;
    
      jest.spyOn(mockCourseRepository, 'findOne').mockResolvedValue(undefined);
    
      try {
        await service.deleteCourseIfNoPurchases(courseId, creatorId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Course with ID '${courseId}' not found.`);
      }
    
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({ where: { courseId } });
    });

    it('should throw ForbiddenException when the course has been purchased', async () => {
      const courseId = 1;
      const creatorId = 1;
    
      const mockCourse = {
        courseId: 1,
        title: 'Course 1',
        creator: {
          id: creatorId,
        },
      };
    
      const mockPurchaseCount = 1;
    
      jest.spyOn(mockCourseRepository, 'findOne').mockResolvedValue(mockCourse);
      jest.spyOn(mockPurchaseService, 'countCoursePurchases').mockResolvedValue(mockPurchaseCount);
    
      try {
        await service.deleteCourseIfNoPurchases(courseId, creatorId);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
        expect(error.message).toEqual('This course cannot be deleted.');
      }
    
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({ where: { courseId } });
      expect(mockPurchaseService.countCoursePurchases).toHaveBeenCalledWith(courseId);
    });

    it('should fetch all unapproved courses', async () => {
      const mockUnapprovedCourses = [
        { courseId: 1, title: 'Course 1', approved: false },
        { courseId: 2, title: 'Course 2', approved: false },
      ];
    
      const mockQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockUnapprovedCourses),
      };
    
      mockCourseRepository.createQueryBuilder = jest.fn().mockReturnValue(mockQueryBuilder);
    
      const result = await service.getAllUnapproved();
    
      expect(mockCourseRepository.createQueryBuilder).toHaveBeenCalledWith('course');
      expect(mockQueryBuilder.where).toHaveBeenCalledWith('course.approved = :approved', { approved: false });
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual(mockUnapprovedCourses);
    });

    it('should throw an error when fetching unapproved courses', async () => {
       const errorMessage = 'Error while fetching unapproved courses.';
      const mockError = new Error(errorMessage); 
    
      mockCourseRepository.createQueryBuilder = jest.fn().mockReturnThis();
      mockCourseRepository.createQueryBuilder().where = jest.fn().mockReturnThis();
      mockCourseRepository.createQueryBuilder().where().getMany = jest.fn().mockRejectedValue(mockError);
    
      try {
        await service.getAllUnapproved();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(errorMessage);
      }
    });

    it('should return an unapproved course by ID', async () => {
      const courseId = 1;
      const mockUnapprovedCourse = { courseId, title: 'Course 1', approved: false };
    
      mockCourseRepository.createQueryBuilder = jest.fn().mockReturnThis();
      mockCourseRepository.createQueryBuilder().where = jest.fn().mockReturnThis();
      mockCourseRepository.createQueryBuilder().where().andWhere = jest.fn().mockReturnThis();
      mockCourseRepository.createQueryBuilder().where().andWhere().getOne = jest.fn().mockResolvedValue(mockUnapprovedCourse);
    
      const result = await service.getUnapprovedCourseById(courseId);
    
      expect(result).toEqual(mockUnapprovedCourse);
    });

    it('should throw a NotFoundException when the unapproved course is not found', async () => {
      const courseId = 1;
    
      mockCourseRepository.createQueryBuilder = jest.fn().mockReturnThis();
      mockCourseRepository.createQueryBuilder().where = jest.fn().mockReturnThis();
      mockCourseRepository.createQueryBuilder().where().andWhere = jest.fn().mockReturnThis();
      mockCourseRepository.createQueryBuilder().where().andWhere().getOne = jest.fn().mockResolvedValue(undefined);
    
      try {
        await service.getUnapprovedCourseById(courseId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Unapproved course with ID '${courseId}' not found.`);
      }
    });

    it('should throw an error when fetching unapproved course', async () => {
      const courseId = 1;
      const errorMessage = 'Error while fetching unapproved course.';
      const mockError = new Error(errorMessage);
    
      mockCourseRepository.createQueryBuilder = jest.fn().mockReturnThis();
      mockCourseRepository.createQueryBuilder().where = jest.fn().mockReturnThis();
      mockCourseRepository.createQueryBuilder().where().andWhere = jest.fn().mockReturnThis();
      mockCourseRepository.createQueryBuilder().where().andWhere().getOne = jest.fn().mockRejectedValue(mockError);
    
      try {
        await service.getUnapprovedCourseById(courseId);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(errorMessage);
      }
    });

    it('should update the approval status of a course and call updateUserWallet', async () => {
      const courseId = 1;
      const approval = true;
      const mockCourse = { courseId, title: 'Course 1', approved: false, creator: { id: 1 } };
      const mockUpdatedCourse = { ...mockCourse, approved: approval };
    
      // mockCourseRepository.findOne = jest.fn().mockResolvedValue(mockCourse);
      // mockCourseRepository.save = jest.fn().mockResolvedValue(mockUpdatedCourse);
      jest.spyOn(mockCourseRepository, 'findOne').mockResolvedValue(mockCourse);
      jest.spyOn(mockCourseRepository, 'save').mockResolvedValue(mockUpdatedCourse);
     
    
      const updateUserWalletSpy = jest.spyOn(mockUserService, 'updateUserWallet').mockResolvedValue(true);
    
      const result = await service.updateApproval(courseId, approval);
    
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({ where: { courseId }, relations: ['creator'] });
      expect(mockCourseRepository.save).toHaveBeenCalledWith(mockCourse);
      expect(updateUserWalletSpy).toHaveBeenCalledWith(mockCourse.creator.id);
      expect(result).toEqual(mockUpdatedCourse);
    });

    it('should throw a NotFoundException when the course is not found', async () => {
      const courseId = 1;
      const approval = true;
    
      mockCourseRepository.findOne = jest.fn().mockResolvedValue(undefined);
    
      try {
        await service.updateApproval(courseId, approval);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Course not found.');
      }
    });

    it('should fetch the courses of a user', async () => {
      const userId = 1;
      const mockCourses = [
        { courseId: 1, title: 'Course 1', creatorId: userId },
        { courseId: 2, title: 'Course 2', creatorId: userId },
      ];
    
      mockCourseRepository.createQueryBuilder = jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockCourses),
      }));
    
      const result = await service.findUserCourses(userId);
    
      expect(mockCourseRepository.createQueryBuilder).toHaveBeenCalledWith('course');
      expect(result).toEqual(mockCourses);
    });

    it('should throw a NotFoundException when no courses are found for the user', async () => {
      const userId = 1;
    
      mockCourseRepository.createQueryBuilder = jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      }));
    
      try {
        await service.findUserCourses(userId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('No courses found for the user.');
      }
    });

    it('should fetch courses matching the keyword', async () => {
      const keyword = 'programming';
      const mockCourses = [
        { courseId: 1, title: 'Programming Basics', topic: 'Programming', price: 19.99, rating: 4.5 },
        { courseId: 2, title: 'Advanced Programming Concepts', topic: 'Software Development', price: 29.99, rating: 4.8 },
      ];
    
      mockCourseRepository.createQueryBuilder = jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockCourses),
      }));
    
      const result = await service.searchByKeyword(keyword);
    
      expect(mockCourseRepository.createQueryBuilder).toHaveBeenCalledWith('course');
      expect(result).toEqual(mockCourses);
    });

    it('should throw a NotFoundException when no courses match the keyword', async () => {
      const keyword = 'photography';
    
      mockCourseRepository.createQueryBuilder = jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      }));
    
      try {
        await service.searchByKeyword(keyword);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('No courses found.');
      }
    });

    it('should add a comment to the course', async () => {
      const courseId = 1;
      const userId = 123;
      const comment = 'Great course!';
      const mockCourse = { courseId: 1, title: 'Course 1', comments: [] };
    
      mockCourseRepository.findOne = jest.fn().mockResolvedValue(mockCourse);
      mockPurchaseService.hasPurchasedCourse = jest.fn().mockResolvedValue(true);
      mockCourseRepository.save = jest.fn().mockResolvedValue(mockCourse);
    
      const result = await service.addCommentToCourse(courseId, userId, comment);
    
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({ where: { courseId } });
      expect(mockPurchaseService.hasPurchasedCourse).toHaveBeenCalledWith(courseId, userId);
      expect(mockCourseRepository.save).toHaveBeenCalledWith(mockCourse);
      expect(result).toEqual(mockCourse);
    });

    it('should throw a NotFoundException when the course is not found', async () => {
      const courseId = 1;
      const userId = 123;
      const comment = 'Great course!';
    
      mockCourseRepository.findOne = jest.fn().mockResolvedValue(undefined);
    
      try {
        await service.addCommentToCourse(courseId, userId, comment);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Course ${courseId} not found.`);
      }
    });
    
    it('should throw a ForbiddenException when the user has not purchased the course', async () => {
      const courseId = 1;
      const userId = 123;
      const comment = 'Great course!';
    
      mockCourseRepository.findOne = jest.fn().mockResolvedValue({});
      mockPurchaseService.hasPurchasedCourse = jest.fn().mockResolvedValue(false);
    
      try {
        await service.addCommentToCourse(courseId, userId, comment);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
        expect(error.message).toEqual('You can only comment on courses you have purchased.');
      }
    });

    it('should throw a BadRequestException when the user has already commented on the course', async () => {
      const courseId = 1;
      const userId = 123;
      const comment = 'Great course!';
      const mockCourse = { courseId: 1, title: 'Course 1', comments: [{ userId: 123, value: 'Previous comment' }] };
    
      mockCourseRepository.findOne = jest.fn().mockResolvedValue(mockCourse);
      mockPurchaseService.hasPurchasedCourse = jest.fn().mockResolvedValue(true);
    
      try {
        await service.addCommentToCourse(courseId, userId, comment);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('You have already commented on this course.');
      }
    });
    it('should update the course stars and calculate the course rating', async () => {
      const courseId = 1;
      const userId = 123;
      const stars = 4;
      const mockCourse = { courseId: 1, title: 'Course 1', stars: [], rating: 0 };
    
      mockCourseRepository.findOne = jest.fn().mockResolvedValue(mockCourse);
      mockPurchaseService.hasPurchasedCourse = jest.fn().mockResolvedValue(true);
      mockPurchaseService.isCourseReviewed = jest.fn().mockResolvedValue(false);
      mockCourseRepository.save = jest.fn().mockResolvedValue(mockCourse);
      service.calculateCourseRating = jest.fn().mockResolvedValue(mockCourse);
    
      const result = await service.updateCourseStars(courseId, userId, stars);
    
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({ where: { courseId } });
      expect(mockPurchaseService.hasPurchasedCourse).toHaveBeenCalledWith(courseId, userId);
      expect(mockPurchaseService.isCourseReviewed).toHaveBeenCalledWith(courseId, userId);
      expect(mockCourseRepository.save).toHaveBeenCalledWith(mockCourse);
      expect(service.calculateCourseRating).toHaveBeenCalledWith(courseId);
      expect(result).toEqual(mockCourse);
    });
    
    it('should throw a NotFoundException when the course is not found', async () => {
      const courseId = 1;
      const userId = 123;
      const stars = 4;
    
      mockCourseRepository.findOne = jest.fn().mockResolvedValue(undefined);
    
      try {
        await service.updateCourseStars(courseId, userId, stars);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('Course not found');
      }
    });
    
    it('should throw a ForbiddenException when the user has not purchased the course', async () => {
      const courseId = 1;
      const userId = 123;
      const stars = 4;
    
      mockCourseRepository.findOne = jest.fn().mockResolvedValue({});
      mockPurchaseService.hasPurchasedCourse = jest.fn().mockResolvedValue(false);
    
      try {
        await service.updateCourseStars(courseId, userId, stars);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
        expect(error.message).toEqual('You can only rate courses you have purchased.');
      }
    });
    
    it('should throw a BadRequestException when the user has already rated the course', async () => {
      const courseId = 1;
      const userId = 123;
      const stars = 4;
      const mockCourse = { courseId: 1, title: 'Course 1', stars: [{ value: 3 }], rating: 3 };
    
      mockCourseRepository.findOne = jest.fn().mockResolvedValue(mockCourse);
      mockPurchaseService.hasPurchasedCourse = jest.fn().mockResolvedValue(true);
      mockPurchaseService.isCourseReviewed = jest.fn().mockResolvedValue(true);
    
      try {
        await service.updateCourseStars(courseId, userId, stars);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('You have already rated this course.');
      }
    });

    it('should calculate the course rating correctly', async () => {
      const courseId = 1;
      const course: Partial<Course> = {
        courseId,
        stars: [
          { value: 4 },
          { value: 5 },
          { value: 3 },
          { value: 4 },
          { value: 5 },
          { value: 2 },
        ],
        rating: 0,
        price: 200,
      };

      // Mock the course repository's findOne and save methods
      mockCourseRepository.findOne.mockResolvedValue(course);
      mockCourseRepository.save.mockResolvedValue(course);

      const updatedCourse = await service.calculateCourseRating(courseId);

      expect(updatedCourse.rating).toBe(4.4);
      expect(updatedCourse.price).toBe(200);

      // Verify that the course repository's findOne method was called with the correct courseId
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({ where: { courseId } });

      // Verify that the course repository's save method was called with the updated course
      expect(mockCourseRepository.save).toHaveBeenCalledWith(updatedCourse);
    });

    it('should apply the price drop when course rating is below 3', async () => {
      const courseId = 1;
      const course: Partial<Course> = {
        courseId,
        stars: [
          { value: 1 },
          { value: 2 },
          { value: 1 },
          { value: 2 },
          { value: 1 },
          { value: 2 },
          { value: 1 },
          { value: 2 },
          { value: 1 },
          { value: 2 },
        ],
        rating: 5,
        price: 200,
      };
    
      // Mock the course repository's findOne and save methods
      mockCourseRepository.findOne.mockResolvedValue(course);
      mockCourseRepository.save.mockResolvedValue(course);
    
      const updatedCourse = await service.calculateCourseRating(courseId);
    
      expect(updatedCourse.rating).toBe(2.8);
      expect(updatedCourse.price).toBe(100);
    
      // Verify that the course repository's findOne method was called with the correct courseId
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({ where: { courseId } });
    
      // Verify that the course repository's save method was called with the updated course
      expect(mockCourseRepository.save).toHaveBeenCalledWith(updatedCourse);
    });
  });

