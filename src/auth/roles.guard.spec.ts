import { UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { User } from '../user/entities/user.entity';
import { Reflector } from '@nestjs/core';
import { Role } from '../user/entities/role.enum';

class ReflectorMock {
    getAllAndOverride = jest.fn();
  };


  const createMockExecutionContext = (user?: User): ExecutionContext => {
    const request = {
      user,
    };
    return {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
      getHandler: () => null,
      getClass: () => null,
      getArgs: () =>  jest.fn().mockReturnValue([]),

    } as ExecutionContext;
  };

  describe('RolesGuard', () => {
    let guard: RolesGuard;
    let reflector: Reflector;
  
    beforeEach(() => {
      reflector = new ReflectorMock() as unknown as Reflector;
      guard = new RolesGuard(reflector);
    });
  
    describe('canActivate', () => {
      it('should allow access when no roles are required', () => {
        const context = createMockExecutionContext();
        const result = guard.canActivate(context);
        expect(result).toBe(true);
      });
  
      it('should allow access when the user has the required role', () => {
        const requiredRoles = [Role.ADMIN];
        const admin = {
            id: 1,
            name: 'Yumi',
            surname: 'Namie',
            wallet: 1000,
            password: 'password1234',
            email: 'yumi@example.com',
            bio: 'I am Yumi',
            created_at: new Date(2023, 7, 16),
            updated_at: new Date(2023, 7, 16), 
            role: Role.ADMIN, };
            
            const context = createMockExecutionContext(admin);

            jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(requiredRoles);
          
  
        const result = guard.canActivate(context);
        expect(result).toBe(true);
     })
 
      it('should throw UnauthorizedException when the user does not have the required role', () => {
        const requiredRoles = ['ADMIN'];
        const user: User = {
            id: 1,
            name: 'John',
            surname: 'Doe',
            wallet: 1000,
            password: 'password1234',
            email: 'john@example.com',
            bio: 'I am John',
            created_at: new Date(2023, 7, 16),
            updated_at: new Date(2023, 7, 16),
            role: Role.USER,
          };
        const context = createMockExecutionContext(user);
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(requiredRoles);
        expect(() => {
          guard.canActivate(context);
        }).toThrow(UnauthorizedException);
      });
  
    }); 
  });