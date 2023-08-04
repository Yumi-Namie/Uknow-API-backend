
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import { LoginAuthDto } from './dtos/login-auth.dto';


describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the AuthService register a user that does not exist in the database', () => {
    const userObject = new RegisterAuthDto(); 
    userObject.email = 'testuser@example.com';
    userObject.password = 'password123';
    userObject.name = 'testuser';
    userObject.surname = 'testsurname';

    const registerSpy = jest.spyOn(mockAuthService, 'register');
      
    controller.registerUser(userObject);
      
    expect(registerSpy).toHaveBeenCalledWith(userObject);
  });

  it('should call the AuthService to signin a user into the system', () => {
    const userObjectLogin: LoginAuthDto = new LoginAuthDto();
    userObjectLogin.email = 'testuser@example.com';
    userObjectLogin.password = 'password123';
    
    const loginSpy = jest.spyOn(mockAuthService, 'login');
    
    controller.loginUser(userObjectLogin);
    
    expect(loginSpy).toHaveBeenCalledWith(userObjectLogin);
  }); 
});

















/* import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import { AuthService } from './auth.service';

describe('AuthController', () => {

  const users = []

  const mockAuthController = {
    createUser: jest.fn().mockImplementation((registerAuthDto: RegisterAuthDto) => {
      const newUser = {
        id: 1,
        ...RegisterAuthDto,
      };
      users.push(newUser);
      return Promise.resolve(newUser);
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).overrideProvider(AuthService)
    .useValue(mockAuthService)
    .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new user and return the user', async () => {
    const newUser: RegisterAuthDto = {
      id: 1,
      name: 'Diego',
      surname: 'Monsalve',
      wallet: 1000,
      password: 'password1234',
      email: 'diego@example.com',
      bio: 'I am Future Diegooo',
      created_at: new Date(2023 - 6 - 16),
      updated_at: expect.any(Date),
    };

    const createdUser = { id: 1, ...newUser };

    jest.spyOn(mockUserService, 'createUser').mockResolvedValue(createdUser);

    const result = await controller.registerUser(newUser);

    expect(result).toEqual(createdUser);
    });
  });

 */