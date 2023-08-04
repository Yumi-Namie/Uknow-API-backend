import { Test } from '@nestjs/testing';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { request } from 'express';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from './jwt-auth.guard';

const users: any = [
  {
    id: 1,
    name: 'Yumi',
    surname: 'Namie',
    wallet: 1000,
    password: 'password1234',
    email: 'yumi@example.com',
    bio: 'I am Yumi',
    created_at: new Date(2023, 7, 16),
    updated_at: new Date(2023, 7, 16),
  },
];

describe('JwtAuthGuard', () => {
    let guard: JwtAuthGuard;
    let jwtService: JwtService;
    let userService: UserService;
  
    const mockUserService = {
      getUserById: jest.fn().mockImplementation((id: number) => {
        const user = users.find((user) => user.id === id);
        return Promise.resolve(user);
      }),
    };
  
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          JwtAuthGuard,
          JwtService,
          UserService,
          {
            provide: UserService,
            useValue: mockUserService,
          },
        ],
      }).compile();
  
      guard = moduleRef.get<JwtAuthGuard>(JwtAuthGuard);
      jwtService = moduleRef.get<JwtService>(JwtService);
      userService = moduleRef.get<UserService>(UserService);
    });
  
    it('should return true if the token is valid and the user exists', async () => {
      const request: any = {
        headers: {
          authorization: 'Bearer validToken',
        },
      };
  
      jest.spyOn(jwtService, 'verify').mockReturnValue({ id: 1 });
      jest.spyOn(mockUserService, 'getUserById').mockReturnValue(users[0]);
  
      const result = await guard.canActivate({ switchToHttp: () => ({ getRequest: () => request }) } as ExecutionContext);
  
      expect(result).toBe(true);
      expect(request.user).toBeDefined();
      expect(request.user.userId).toBe(1);
    });
    it('should throw an error if the token is invalid', async () => {
        const invalidToken = 'invalidToken';
        
        jest.spyOn(jwtService, 'verify').mockImplementation(() => {
          throw new UnauthorizedException('Invalid or expired JWT token');
        });
    
        let error;
        try {
          await guard.canActivate({
            switchToHttp: () => ({
              getRequest: () => ({
                headers: {
                  authorization: `Bearer ${invalidToken}`,
                },
              }),
            }),
          } as ExecutionContext);
        } catch (err) {
          error = err;
        }
    
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toEqual('Invalid or expired JWT token');
      });
    });