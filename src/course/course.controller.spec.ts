import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course, courseDifficulty } from './entities/course.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Purchase } from '../purchase/entities/purchase.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from '../user/entities/user.entity';
import { BadRequestException, ConflictException, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { Role } from '../user/entities/role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PurchaseService } from '../purchase/purchase.service';

describe('CourseController', () => {
  let controller: CourseController;
  let courseService: CourseService;

  const mockRolesGuard = {
    canActivate: () => true,
  };

  const mockCourseService = {
    createCourse: jest.fn(),
    getAllUnapproved: jest.fn(),
    getUnapprovedCourseById: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    removeCoursebyAdmin: jest.fn(),
    deleteCourseIfNoPurchases: jest.fn(),
    updateApproval: jest.fn(),
    findUserCourses: jest.fn(),
    searchByKeyword: jest.fn(),
    updateCourseStars: jest.fn(),
    addCommentToCourse: jest.fn(),
  };

  const mockJwtService = {};
  const mockUserService = {
    updateUserWallet: jest.fn(),
  };
  const mockPurchaseService = {};
  const mockUserRepository = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
       /*  CourseService,  */
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: CourseService,
          useValue: mockCourseService,
        },
        { provide: PurchaseService,
          useValue: mockPurchaseService,
        },
        {
          provide: RolesGuard,
          useValue: mockRolesGuard,
      },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        }
      ],
    }).compile();

    courseService = module.get<CourseService>(CourseService);

    controller = module.get<CourseController>(CourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  it('should create a new course', async () => {
    const userId = 1;
    const req = {
      user: { id: userId }
    };
  
    const createCourseDto = new CreateCourseDto();
    createCourseDto.title = 'Diego: Dealing';
    createCourseDto.description = 'This course will take you on a journey about dealing with feelings';
    createCourseDto.difficulty = courseDifficulty.Easy;
    createCourseDto.topic = 'Personal Development';
    createCourseDto.content = 'Lorem Ipsum';
    createCourseDto.creatorId = userId;
  
    const createdCourse: Course = {
      title: 'Diego: Dealing',
      description: 'This course will take you on a journey about dealing with feelings',
      difficulty: courseDifficulty.Easy,
      topic: 'Personal Development',
      content: 'Lorem Ipsum',
      created_at: new Date(2023, 7, 16),
      updated_at: expect.any(Date),
      approved: false,
      courseId: 1,
      price: 0,
      rating: 0,
      stars: [],
      comments: [],
      creator: new User(),
    };
  
    jest.spyOn(mockCourseService, 'createCourse').mockImplementation((createCourseDto) => {
      expect(createCourseDto.creatorId).toBe(userId);
      return Promise.resolve(createdCourse);
    });
  
    const result = await controller.createCourse(createCourseDto, req);
  
    expect(result).toBe(createdCourse);
    expect(mockCourseService.createCourse).toHaveBeenCalled();
  });
  
  // it('should create a new course', async () => {
  //   const userId = 1;
  //   const req = {
  //     user: {
  //       id: userId
  //     }
  //   };
    
  //   const createCourseDto = new CreateCourseDto();
  //   createCourseDto.title = 'Diego: Dealing';
  //   createCourseDto.description = 'This course will take you on a journey about dealing with feelings';
  //   createCourseDto.difficulty = courseDifficulty.Easy;
  //   createCourseDto.topic = 'Personal Development';
  //   createCourseDto.content = 'Lorem Ipsum';
  //   createCourseDto.creatorId = userId;
    
  //   const createdCourse: Course = {
  //     title: 'Diego: Dealing',
  //     description: 'This course will take you on a journey about dealing with feelings',
  //     difficulty: courseDifficulty.Easy,
  //     topic: 'Personal Development',
  //     content: 'Lorem Ipsum',
  //     created_at: new Date(2023, 7, 16),
  //     updated_at: expect.any(Date),
  //     approved: false,
  //     courseId: 1,
  //     price: 0,
  //     rating: 0,
  //     stars: [],
  //     comments: [],
  //     creator: new User(),
  //    };
    
  //   jest.spyOn(mockCourseService, 'createCourse').mockResolvedValue(createdCourse);
    
  //   const result = await controller.createCourse(createCourseDto, req);
    
  //   expect(mockCourseService.createCourse).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       ...createCourseDto,
  //       creatorId: expect.any(Number),
  //     }),
  //     expect.objectContaining({ id: expect.any(Number) })
  //   );
  //   expect(result).toBe(createdCourse);
  // });
  
  it('should get all unapproved courses as an admin', async () => {
    // Mock the getAllUnapproved method
    const unapprovedCourses: Course[] = [
      {
        title: 'Course 1',
        description: 'Description of Course 1',
        difficulty: courseDifficulty.Easy,
        topic: 'Topic 1',
        content: 'Content of Course 1',
        created_at: new Date(),
        updated_at: new Date(),
        approved: false,
        courseId: 1,
        price: 0,
        rating: 0,
        stars: [],
        comments: [],
        creator: new User(),
      },
      {
        title: 'Course 2',
        description: 'Description of Course 2',
        difficulty: courseDifficulty.Medium,
        topic: 'Topic 2',
        content: 'Content of Course 2',
        created_at: new Date(),
        updated_at: new Date(),
        approved: true, // One course is approved
        courseId: 2,
        price: 0,
        rating: 0,
        stars: [],
        comments: [],
        creator: new User(),
      },
      {
        title: 'Course 3',
        description: 'Description of Course 3',
        difficulty: courseDifficulty.Hard,
        topic: 'Topic 3',
        content: 'Content of Course 3',
        created_at: new Date(),
        updated_at: new Date(),
        approved: false, // Third course is unapproved
        courseId: 3,
        price: 0,
        rating: 0,
        stars: [],
        comments: [],
        creator: new User(),
      },
    ];
    jest.spyOn(mockCourseService, 'getAllUnapproved').mockResolvedValue(unapprovedCourses);
  
    // Mock the RolesGuard canActivate method to bypass role check
    const mockRolesGuard = {
      canActivate: () => true,
    };
  
    // Make a request to the getUnapprovedCourses endpoint
    const result = await controller.getUnapprovedCourses();

  const receivedUnapprovedCourses = result.filter(course => !course.approved);

  // Filter out the approved courses from the expected result
  const expectedUnapprovedCourses = unapprovedCourses.filter(course => !course.approved);

  // Assert that the received result contains only the unapproved courses
  expect(receivedUnapprovedCourses).toEqual(expectedUnapprovedCourses);

  });

  it('should return the unapproved course with the given courseId for an admin user', async () => {
    const courseId = 1;
    const unapprovedCourse: Course[] = [
      {
        title: 'Course 1',
        description: 'Description of Course 1',
        difficulty: courseDifficulty.Easy,
        topic: 'Topic 1',
        content: 'Content of Course 1',
        created_at: new Date(),
        updated_at: new Date(),
        approved: false,
        courseId: 1,
        price: 0,
        rating: 0,
        stars: [],
        comments: [],
        creator: new User(),
      },
    ];
    jest.spyOn(mockCourseService, 'getUnapprovedCourseById').mockResolvedValue(unapprovedCourse)
  
    const mockRolesGuard = {
      canActivate: () => true,
    };
  
    const result = await controller.getUnapCourseById(courseId);

    expect(result).toEqual(unapprovedCourse);

  });

   it('should return all courses', async () => {
    // Mock the findAll method
    const courses: Course[] = [];
    jest.spyOn(mockCourseService, 'findAll').mockResolvedValue(courses);
  
    // Make a request to the findAll endpoint
    const result = await controller.findAll();
  
    // Assert that the response contains the expected courses
    expect(result).toEqual(courses);
  });

  it('should throw NotFoundException when no approved courses are found', async () => {
    jest.spyOn(mockCourseService, 'findAll').mockRejectedValue(new NotFoundException('No approved courses found'));
  
    try {
      await controller.findAll();
      throw new Error('Expected NotFoundException to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('No approved courses found.');
    }
  }); 

  it('should return courses matching the keyword', async () => {
    // Mock the searchByKeyword method
    const keyword = 'programming';
    const courses: Course[] = [
      {
        title: 'Course 1',
        description: 'Description of Course 1',
        difficulty: courseDifficulty.Easy,
        topic: 'Programming',
        content: 'Content of Course 1',
        created_at: new Date(),
        updated_at: new Date(),
        approved: true,
        courseId: 1,
        price: 0,
        rating: 0,
        stars: [],
        comments: [],
        creator: new User(),
      },
      // Add more sample courses as needed
    ];
    jest.spyOn(mockCourseService, 'searchByKeyword').mockResolvedValue(courses);
  
    // Make a request to the searchByKeyword endpoint
    const result = await controller.searchByKeyword(keyword);
  
    // Assert that the response contains the expected courses
    expect(result).toEqual(courses);
  });

  it('should return a not found error when no course with a matching keyword is found', async () => {
    const keyword = 'programming';
    jest.spyOn(mockCourseService, 'searchByKeyword').mockRejectedValue(new NotFoundException('No courses found.'));
  
    try {
      await controller.searchByKeyword(keyword);
      throw new Error('Expected NotFoundException to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('No courses found.');
    }
  });
 

  
  it('should return the course with the given courseId', async () => {
    const courseId = 1;
    const course: Course = {
      title: 'Course 1',
      description: 'Description of Course 1',
      difficulty: courseDifficulty.Easy,
      topic: 'Programming',
      content: 'Content of Course 1',
      created_at: new Date(),
      updated_at: new Date(),
      approved: true,
      courseId: 1,
      price: 0,
      rating: 0,
      stars: [],
      comments: [],
      creator: new User(), 
    };
    jest.spyOn(mockCourseService, 'findOne').mockResolvedValue(course);
  
    const result = await controller.findOne(courseId);
  
    expect(result).toEqual(course);
  });
  
  it('should throw NotFoundException when the course with the given courseId is not found', async () => {
    const courseId = 1;
    jest.spyOn(mockCourseService, 'findOne').mockRejectedValue(new NotFoundException('Course not found'));
  
    try {
      await controller.findOne(courseId);
      throw new Error('Expected NotFoundException to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Course not found');
    }
  });
 
  it('should update the course with the given courseId for an authorized user', async () => {
    const courseId = 1;
    const updateCourseDto: UpdateCourseDto = {
      title: 'Updated Course 1',
      description: 'Updated Description of Course 1',
      difficulty: courseDifficulty.Medium,
      topic: 'Updated Programming',
      content: 'Updated Content of Course 1',
    };
    const updatedCourse: Course = {
      title: 'Updated Course 1',
      description: 'Updated Description of Course 1',
      difficulty: courseDifficulty.Medium,
      topic: 'Updated Programming',
      content: 'Updated Content of Course 1',
      created_at: new Date(),
      updated_at: new Date(),
      approved: true,
      courseId: 1,
      price: 50,
      rating: 0,
      stars: [],
      comments: [],
      creator: new User(),
    };
    const mockRequest = {
      user: { id: 1 }, 
    };
    jest.spyOn(mockCourseService, 'update').mockResolvedValue(updatedCourse);
  
    const result = await controller.update(courseId, updateCourseDto, mockRequest);
  
    expect(result).toEqual(updatedCourse);
  });

  it('should throw NotFoundException when the course with the given courseId is not found', async () => {
    const courseId = 1;
    const updateCourseDto: UpdateCourseDto = {
      title: 'Updated Course 1',
      description: 'Updated Description of Course 1',
      difficulty: courseDifficulty.Medium,
      topic: 'Updated Programming',
      content: 'Updated Content of Course 1',
    };

    const mockRequest = {
      user: { id: 1 }, // Replace 1 with the actual user ID
    };
    jest.spyOn(mockCourseService, 'update').mockResolvedValue(null);
  
    try {
      await controller.update(courseId, updateCourseDto, mockRequest);
      throw new Error('Expected NotFoundException to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Course not found.');
    }
  });
  
  it('should throw Error when failed to update the course', async () => {
    const courseId = 1;
    const updateCourseDto: UpdateCourseDto = {
      title: 'Updated Course 1',
      description: 'Updated Description of Course 1',
      difficulty: courseDifficulty.Medium,
      topic: 'Updated Programming',
      content: 'Updated Content of Course 1',
    };
    const mockRequest = {
      user: { id: 1 }, // Replace 1 with the actual user ID
    };
    const errorMessage = 'Failed to update the course.';
    jest.spyOn(mockCourseService, 'update').mockRejectedValue(new Error(errorMessage));
  
    try {
      await controller.update(courseId, updateCourseDto, mockRequest);
      throw new Error('Expected Error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(errorMessage);
    }
  });

  it('should successfully remove the course when accessed by an admin', async () => {
    const courseId = 1;
    const mockRequest = {
      user: { role: Role.ADMIN },
    };
    jest.spyOn(mockRolesGuard, 'canActivate').mockReturnValue(true);
    jest.spyOn(mockCourseService, 'removeCoursebyAdmin').mockResolvedValue(undefined);
  
    const result = await controller.removeCourse(courseId, mockRequest);
  
    expect(result).toBeUndefined();
    expect(mockCourseService.removeCoursebyAdmin).toHaveBeenCalledWith(courseId);
  });

  it('should throw UnauthorizedException when a non-admin user tries to remove the course', async () => {
    const courseId = 1;
    const mockRequest = {
      user: { role: Role.USER },
    };
    jest.spyOn(mockRolesGuard, 'canActivate').mockReturnValue(false);
  
    try {
      await controller.removeCourse(courseId, mockRequest);
      throw new Error('Expected UnauthorizedException to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.message).toBe('Unauthorized');
    }
  });

  it('should successfully delete the course if no purchases are made', async () => {
    // Mock data
    const courseId = 1;
    const userId = 1;
    const mockRequest = {
      user: {id: 1},
    };
  
    // Mock the deleteCourseIfNoPurchases method to resolve undefined
    jest.spyOn(mockCourseService, 'deleteCourseIfNoPurchases').mockResolvedValue(undefined);
  
    // Call the deleteCourse method
    await controller.deleteCourse(courseId, mockRequest);
  
    // Verify that deleteCourseIfNoPurchases is called with the correct courseId and userId
    expect(mockCourseService.deleteCourseIfNoPurchases).toHaveBeenCalledWith(courseId, userId);
  });
  it('should update the approval status of the course with the given courseId', async () => {
    const courseId = 1;
    const userId = 1;
    const mockCreator: User = {
      id: userId,
      name: 'Yumi',
      surname: 'Namie',
      wallet: 200,
      password: 'password1234',
      email: 'yumi@example.com',
      bio: 'I am Yumi',
      created_at: new Date(2023, 7, 16),
      updated_at: new Date(),
      role: Role.USER,
    }

    const mockUpdatedCourse: Course  = {
      title: 'Updated Course 1',
      description: 'Updated Description of Course 1',
      difficulty: courseDifficulty.Medium,
      topic: 'Updated Programming',
      content: 'Updated Content of Course 1',
      created_at: new Date(),
      updated_at: new Date(),
      approved: true,
      courseId: courseId,
      price: 50,
      rating: 0,
      stars: [],
      comments: [],
      creator:mockCreator,
    };
    // Mock the courseService.updateApproval method to return the updated course
  jest.spyOn(mockCourseService, 'updateApproval').mockResolvedValue(mockUpdatedCourse);

  // Mock the user repository save method to return the updated creator
  jest.spyOn(mockUserRepository, 'save').mockResolvedValue(mockCreator);

  // Make the request to approve the course
  const result = await controller.approveCourse(courseId);

  // Assert that the courseService.updateApproval method was called with the correct courseId
  expect(mockCourseService.updateApproval).toHaveBeenCalledWith(courseId, true);

  // Assert that the userRepository.save method was called with the correct creator
  expect(mockUserRepository.save).toHaveBeenCalledWith(mockCreator);

  // Assert that the result is equal to the mockUpdatedCourse
  expect(result).toEqual(mockUpdatedCourse);
});


  it('should throw NotFoundException when the course to approve is not found', async () => {
    const courseId = 1;
    jest.spyOn(mockCourseService, 'updateApproval').mockRejectedValueOnce(new BadRequestException('Failed to update the course.'));
  
    try {
      await controller.approveCourse(courseId);
      throw new Error('Expected error was not thrown');
    } catch (error) {
      // Verify that an error is thrown
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Failed to update the course.');
    }
  });
  it('should return the courses of a user', async () => {
    const userId = 1; // ID of the user
    const userCourses: Course[] = [
      {
        title: 'Course 1',
        description: 'Description of Course 1',
        difficulty: courseDifficulty.Easy,
        topic: 'Topic of Course 1',
        content: 'Content of Course 1',
        created_at: new Date(),
      updated_at: new Date(),
      approved: true,
      courseId: 1,
      price: 50,
      rating: 0,
      stars: [],
      comments: [],
      creator: new User(),  
      },
      {
      title: 'Course 2',
      description: 'Description of Course 2',
      difficulty: courseDifficulty.Medium,
      topic: 'Topic of Course 2',
      content: 'Content of Course 2',
      created_at: new Date(),
      updated_at: new Date(),
      approved: true,
      courseId: 1,
      price: 50,
      rating: 0,
      stars: [],
      comments: [],
      creator: new User(),  
      },
    ]
    jest.spyOn(mockCourseService, 'findUserCourses').mockResolvedValue(userCourses);
    const req = { user: { id: userId } };
    const result = await controller.findUserCourses(userId, req);
  
    expect(result).toEqual(userCourses);
    expect(mockCourseService.findUserCourses).toHaveBeenCalledWith(userId);
    expect(mockCourseService.findUserCourses).toHaveBeenCalledTimes(1);
  });


    it('should update the course stars when the user has purchased the course and not reviewed it yet', async () => {
      // Mock data
      const courseId = 1;
      const userId = 1;
      const stars = 4;
  
      // Mock the updateCourseStars method
      jest.spyOn(mockCourseService, 'updateCourseStars').mockResolvedValue({} as Course);
  
      const req = { user: { id: userId } };
  
      // Call the updateCourseStars method
      const result = await controller.updateCourseStars(courseId, stars, req);
  
      // Verify that the updateCourseStars method is called with the correct parameters
      expect(mockCourseService.updateCourseStars).toHaveBeenCalledWith(courseId, userId, stars);
  
      // Verify the result
      expect(result).toEqual({});
    });

    it('should throw an error when the user has not purchased the course or already reviewed it', async () => {
      const courseId = 1;
      const userId = 1;
      const stars = 4;
    
      // Mock the updateCourseStars method to throw an error
      jest.spyOn(mockCourseService, 'updateCourseStars').mockRejectedValue(new Error('User has not purchased the course or already reviewed it'));
    
      const req = { user: { id: userId } };
    
      try {
        await controller.updateCourseStars(courseId, stars, req);
        throw new Error('Expected error was not thrown');
      } catch (error) {
        // Verify that an error is thrown
        expect(error).toBeTruthy();
      }
    
      // Verify that the updateCourseStars method is called with the correct parameters
      expect(mockCourseService.updateCourseStars).toHaveBeenCalledWith(courseId, userId, stars);
    });

  it('should add a comment to the course', async () => {
    const courseId = 1;
    const userId = 1;
    const comment = 'Great course!';
  
    // Mock the addCommentToCourse method to return a dummy course
    const mockCourse = {} as Course;
    jest.spyOn(mockCourseService, 'addCommentToCourse').mockResolvedValue(mockCourse);
  
    const req = { user: { id: userId } };
  
    const result = await controller.addComment(courseId, req, comment );
  
    // Verify that the addCommentToCourse method is called with the correct parameters
    expect(mockCourseService.addCommentToCourse).toHaveBeenCalledWith(courseId, userId, comment);
  
    // Verify that the result matches the mocked course
    expect(result).toBe(mockCourse);
  });
  

});
