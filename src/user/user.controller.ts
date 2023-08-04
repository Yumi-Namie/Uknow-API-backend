import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
  Req,
  UnauthorizedException,

} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from './entities/role.enum';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findAll(@Req() req) {
    if (req.user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Unauthorized')   
     }
    return await this.userService.getUser();
  }

  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID '${id}' not found`);
    }
    if (req.user.role === Role.ADMIN || req.user.id === id) {
      // Return the user details
      return user;
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }


  @Patch(':id/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto, @Req() req) {
    if (req.user.role === Role.ADMIN || req.user.id === id) {
      return await this.userService.updateUser(id, updateUserDto);
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  @Delete(':id/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async removeUser(@Param('id', ParseIntPipe) id: number, @Req() req) {
    if (req.user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Unauthorized');
    }
    const result = await this.userService.removeUser(id);
    if (!result) {
      throw new NotFoundException(`User with ID '${id}' not found`);
    }
    return result;
  }

  
};
