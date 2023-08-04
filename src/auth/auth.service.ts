import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import { hash, genSalt, compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginAuthDto } from './dtos/login-auth.dto';
import { JwtService } from '@nestjs/jwt';





// Generate Token
@Injectable()
export class AuthService {
  
  constructor(private readonly userService: UserService,
    private jwtService: JwtService, ) {}



async encrypt(password: string): Promise<string> {
    try {
      const salt = await genSalt(10);
      return hash(password, salt);
    } catch (error) {
      throw new InternalServerErrorException('Error al encriptar la contraseña');
    }
  }

  async register(userObject: RegisterAuthDto) {
    try {
      const hashedPassword = await this.encrypt(userObject.password);
      const createUser = await this.userService.createUser({
        ...userObject,
        password: hashedPassword,
      });
  
      const { password, ...rest } = createUser;
  
      return rest;
    } catch (error) {
      if (error) {
        throw new HttpException('Duplicated email', 409);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


async login(userObjectLogin: LoginAuthDto) {
  const { email, password } = userObjectLogin;
  const findUser = await this.userService.getUserByEmail(email);
  if (!findUser) throw new HttpException('User not Found', 404);

  const checkPassword = await compare(password, findUser.password);
  if (!checkPassword) throw new HttpException('Password invalid', 403);

  // TODO Add user role
  const payload = { id: findUser.id, name: findUser.name, role: findUser.role };
  const token = this.jwtService.sign(payload);

  const { password: _, ...userWithoutPassword } = findUser; // Excluir el campo "password" en la desestructuración

  const data = {
    user: userWithoutPassword, // Utilizar el objeto sin el campo "password"
    token,
    role: findUser.role,
  };

  return data;
}
}

// async validateUser(loggedUser: LoginDto) {
//   try {
//     const user = await this.userService.findOneByEmail(loggedUser.email);
//     //verificar la password
//     if (await this.passwordVerify(loggedUser.password, user.password))
//       return {
//         accessToken: await this.jwtService.signAsync({
//           email: loggedUser.email,
//         }), //'esto es un token', //to-do: generación del token
//       };

//     throw new UnauthorizedException();
//   } catch (error) {
//     throw error;
//   }
// }

/* 
async getCurrentUser(req: Request): Promise<User> {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    throw new UnauthorizedException('No token provided.');
  }

  try {
    const decodedToken = this.jwtService.verify(token);
    const userId = decodedToken.sub; // Assuming the user ID is stored in the 'sub' claim of the JWT
    // Fetch the user from the database based on the user ID
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid token.');
    }
    return user;
  } catch (error) {
    throw new UnauthorizedException('Invalid token.');
  }
}*/
 




//   async login(userObjectLogin:LoginAuthDto){
//     const {email, password} = userObjectLogin;
//       const findUser = await this.userService.getUserByEmail(email);
//       if(!findUser) throw new HttpException('User not Found', 404);

//       const checkPassword = await compare(password, findUser.password);
//       if(!checkPassword) throw new HttpException('Password invalid', 403);
      
//       const payload = {id:findUser.id, name:findUser.name}

// const token = this.jwtService.sign(payload)



//       const data = {
//         user:findUser,
//         token,
//       };
//       return data;

// }

