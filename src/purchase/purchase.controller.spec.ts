import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { RolesGuard } from '../auth/roles.guard';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

describe('PurchaseController', () => {
  let controller: PurchaseController;

  const mockPurchaseService = {
    makePurchase: jest.fn(),
    countCoursePurchases: jest.fn(),
    getUserPurchasedCourses: jest.fn(),
    getUserPurchasedCourse: jest.fn(),
    hasPurchasedCourse: jest.fn(),
    isCourseReviewed: jest.fn(),
  }

/*   const mockJwtService = {};
  const mockRolesGuard = {
    canActivate: () => true,
  }; */
  const mockUserService = {};


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseController],
      providers: [
        /* PurchaseService */
      {
        provide: PurchaseService,
        useValue: mockPurchaseService
      },
     /*  {
        provide: RolesGuard,
        useValue: mockRolesGuard,
      },
      {
        provide: JwtService,
        useValue: mockJwtService,
      }, */
      {
        provide: UserService,
        useValue: mockUserService,
      },
  ],
    }).compile();

    controller = module.get<PurchaseController>(PurchaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
 


});
