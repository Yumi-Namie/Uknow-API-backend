import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from '@nestjs/common';
import { Role } from '../user/entities/role.enum';
import { User } from '../user/entities/user.entity';


//Access controll by roles
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles || requireRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    
    const hasPermission = user && user.role && requireRoles.some(role => user.role === role);

   

    if (!hasPermission) {
      throw new UnauthorizedException('Unauthorized');
    }

    const routeParams = context.getArgs()[0];
    const requestedUserId = routeParams?.id;

    // Verificar permision del usuário para acceder su próprio perfil
    if (requestedUserId && user.role !== Role.ADMIN && user.id.toString() !== requestedUserId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }
}






// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     console.log(requireRoles + " teste de requireRole")
//     if (!requireRoles || requireRoles.length === 0) {
//       console.log("es true?")
//       return true;
//     }

//     const request = context.switchToHttp().getRequest();
//     const user: User = request.user;
//     console.log("teste de roleguards", request.user)
//     const routeRoles = this.reflector.get<Role[]>('roles', context.getHandler());

//     if (routeRoles && routeRoles.length > 0) {
//       // Verificar permissões especificadas no decorador @Roles da rota
//       const hasPermission = requireRoles.some(role => user.role === role);
//       console.log(hasPermission + "teste!!!!!!!")
//       if (!hasPermission) {
//         throw new UnauthorizedException('Unauthorized');
//       }
//     }

//     const routeParams = context.getArgs()[0]; // Obter parâmetros da rota
//     const requestedUserId = routeParams?.id; // Obter o ID do usuário da rota
//     console.log(user.role + "teste 2!!")
//     // Verificar permissão do usuário para acessar seu próprio perfil
//     if (requestedUserId && user.role !== Role.ADMIN && user.id.toString() !== requestedUserId) {
//       throw new UnauthorizedException('Unauthorized');
//     }

//     return true;
//   }
// }









// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     if (!requireRoles || requireRoles.length === 0) {
//       return true;
//     }

//     const request = context.switchToHttp().getRequest();
//     const user: User = request.user.id;

//     if (user.role !== Role.ADMIN  || !requireRoles.includes(Role.ADMIN)) {
//       throw new UnauthorizedException('Unauthorized');
//     }

//     return true;
//   }
// }


















  // constructor(
  //   private reflector: Reflector,
  //   private jwtService: JwtService,
  // ) {}

  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   const requireRole = this.reflector.getAllAndOverride<Role[]>('role', [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);
    
  //   // true for free access
  //   if (!requireRole) {
  //     return true;
  //   }
    
  //   const request: Request = context.switchToHttp().getRequest();

    // const token = this._extractTokenFromHeader(request);
    // if (!token) {
    //   throw new UnauthorizedException();
    // }

    // try {
      // const payload = await this.jwtService.verifyAsync(token, {
      //   secret: jwtConstants.secret,
      // });

//       const user: User = request.user;
//       if (!user || !user.role || !requireRole.includes(user.role)) {
//         throw new UnauthorizedException();
//       }
//     } catch (error) {
//       throw new UnauthorizedException();
//     }

//     return true;
//   }

//   private _extractTokenFromHeader(request: Request) {
//     const authHeader = request.headers.authorization;
//     if (authHeader && authHeader.startsWith('Bearer ')) {
//       return authHeader.substring(7);
//     }
//     return null;
//   }
// }


/*
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private userService: UserService,
        ) {}

    // does it have access?
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this._extractTokenFromHeader(request);
        if (!token) throw new Error();
        try {
            const payload = await this.jwtService.verifyAsync(token, {
            secret: jwtConstants.secret,
            });
            request['user'] = payload;
            } catch (error) {
                throw new UnauthorizedException();
            }
      
          return true;
        }
        //What the require role?
        // const requireRole = this.reflector.getAllAndOverride<Role[]>('role', [
        //     context.getHandler(),
        //     context.getClass(),
        // ]);



        //Libera acceso para los users que no sean ADMIN 
        if (!requireRole) {
            return true;
        }

        // const { User } = context.switchToHttp().getRequest();


        // does the current user making req have those req role?
        return requireRole.some((role) => User.role.includes(role))
       
    }
    private _extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization.split(' ') ?? []; 
        return type === 'Bearer' ? token : undefined;
    }
}
*/