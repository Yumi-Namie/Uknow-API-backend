import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { error } from 'console';
import { hash } from 'bcrypt';




@ApiTags('user')
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const userCreated = await this.userRepository.save(createUserDto);
      return userCreated;
    } catch (error) {
      //console.error(error);
      throw new Error('Failed to create user');
    }
  }

  /* async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const userCreated = await this.userRepository.save(createUserDto);
      console.log(userCreated);
      return userCreated;
    } catch (error) {
      throw new BadRequestException()
    }
  }  */

  //findAll
  async getUser(): Promise<User[]> {
    try {
      return this.userRepository.find();
    }catch (error){
      throw new ForbiddenException();
    }
    
  }

  //findOne
  /* async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
} */
async getUserById(id: number): Promise<User> {
  try {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    } 
  } catch (error) {
    throw new NotFoundException('User not found');
  }
}

 /*  getUserByEmail(email: string) {
    return this.userRepository.findOne({where: {email}}) */

  async getUserByEmail(email: string) {
    if (!email) {
      throw new NotFoundException('Email not found');
    }
  
    return await this.userRepository.findOne({where: {email}})
  } 


  //update
/*   async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const toUpdate = await this.userRepository.findOne({ where: { id } });
  
      Object.assign(toUpdate, updateUserDto);
  
      return await this.userRepository.save(toUpdate);
    } catch (error) {
      throw new NotFoundException ('User not found');
    }
  } */



// ...

async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  try {
    const toUpdate = await this.userRepository.findOne({ where: { id } });

    if (!toUpdate) {
      throw new NotFoundException('User not found');
    }

    toUpdate.bio = updateUserDto.bio;

    if (updateUserDto.bio !== undefined) {
      toUpdate.bio = updateUserDto.bio;
    } else {
      throw new Error('Invalid field(s) for update');
    }

    if (updateUserDto.password !== undefined) {
      const hashedPassword = await hash(updateUserDto.password, 10);
      toUpdate.password = hashedPassword;
    }

    return await this.userRepository.save(toUpdate);
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    } else {
      throw new BadRequestException('Failed to update user');
    }
  }
}

  // async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  //   try {
  //     const toUpdate = await this.userRepository.findOne({ where: { id } });
  
  //     if (!toUpdate) {
  //       throw new NotFoundException('User not found');
  //     }
  
  //     toUpdate.bio = updateUserDto.bio;
  //     toUpdate.password = updateUserDto.password;

  //     if (updateUserDto.bio !== undefined) {
  //       toUpdate.bio = updateUserDto.bio;
  //     } else {
  //       throw new Error('Invalid field(s) for update');
  //     }
  
  //     return await this.userRepository.save(toUpdate);
  //   } catch (error) {
  //     if (error instanceof NotFoundException) {
  //       throw error;
  //     } else {
  //       throw new BadRequestException('Failed to update user');
  //     }
  //   }
  // }

  //delete
  async removeUser(id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id } });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const result = await this.userRepository.delete(id);
  
    if (result.affected === 0) {
      throw new InternalServerErrorException('Failed to delete user');
    }
  
    return true;
  }
  
  async updateUserWallet(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.wallet += 50;
    const updatedUser = await this.userRepository.save(user);

    return updatedUser;
  }
 
}
