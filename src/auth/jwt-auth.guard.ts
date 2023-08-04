import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { jwtConstants } from './jwt.constants';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from '../user/user.service';


// Validate Token

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(
      private jwtService: JwtService,
      private userService: UserService,
    ) {
      super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    
      const request = context.switchToHttp().getRequest();
      return this.validateRequest(request);
    }
  
    async validateRequest(request: Request): Promise<boolean> {
      const token = request.headers.authorization?.replace('Bearer ', '');
  
      if (token) {
        try {
         
          const decodedToken = this.jwtService.verify(token,  {
              secret: jwtConstants.secret,
            });
          const user = await this.userService.getUserById(decodedToken.id);
  
          if (user) {
            
            const { password, ...userWithoutPassword } = user;
            request.user = userWithoutPassword;
            request.user['userId'] = decodedToken.id;
            
            return true;
          }
        } catch (error) {
          throw new UnauthorizedException('Invalid or expired JWT token');
        }
      }
  
      throw new UnauthorizedException('JWT token not provided');
    }
}


// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   constructor(
//     private jwtService: JwtService,
//     private userService: UserService,
//   ) {
//     super();
//   }

//   CanActivate(context: ExecutionContext): Promise<boolean> {
//     console.log("aqui 0")
//     const canActivate = super.canActivate(context);
//     console.log("aqui 1")
//     if (!canActivate) {
//       console.log("aqui 2")
//       return false;
//     }
//     console.log("aqui ")
//     const request = context.switchToHttp().getRequest();
//     const user = this.getUserFromToken(request);

//     if (!user) {
//       throw new UnauthorizedException('Invalid or expired JWT token');
//     }

//     request.user = user;
//     console.log(request.user + "aqui primeiro teste")
//     return true;
//   }

//   private async getUserFromToken(request: Request): Promise<User | null> {
//     const token = request.headers.authorization?.replace('Bearer ', '');

//     if (token) {
//       try {
//         const decodedToken = this.jwtService.verify(token, {
//           secret: jwtConstants.secret,
//         });
//         const user = await this.userService.getUserById(decodedToken.id);
//         return user;
//       } catch (error) {
//         throw new UnauthorizedException('Invalid or expired JWT token');
//       }
//     }

//     return null;
//   }
// }


// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//     constructor(
//         private jwtService: JwtService,
//         private userService: UserService,
//       ) {
//         super();
//     }

//     canActivate(context: ExecutionContext): boolean | Promise<boolean> {
//         const request = context.switchToHttp().getRequest();
//         return this.validateRequest(request);
//       }
    
//       async validateRequest(request: Request): Promise<boolean> {
//         const token = request.headers.authorization?.replace('Bearer ', '');
    
//         if (token) {
//           try {
//             const decodedToken = this.jwtService.verify(token,  {
//                 secret: jwtConstants.secret,
//               });
//             const user = await this.userService.getUserById(decodedToken.id);
    
//             if (user) {
//               request.user = user;
//               return true;
//             }
//           } catch (error) {
//             throw new UnauthorizedException('Invalid or expired JWT token');
//           }
//         }
    
//         throw new UnauthorizedException('JWT token not provided');
//       }
// }
    
