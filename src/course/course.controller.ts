import { 
  Controller,
   Get,Post,
   Body,Patch,
   Param,Delete,
   Req,UseGuards,
  NotFoundException,
  UnauthorizedException,
  ParseIntPipe,Query, BadRequestException, ConflictException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../user/entities/role.enum';


@ApiBearerAuth()
@ApiTags('course')
@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,)
 {}

  @Post('course-creation')
  @UseGuards(JwtAuthGuard)
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @Req() req,
  ): Promise<Course> {
    const user: User = req['user'];
    createCourseDto.creatorId = user.id;
    
    return this.courseService.createCourse(createCourseDto, user);
  } 
  
  // !! COURSES NOT APPROVED
  @Get('unapproved')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getUnapprovedCourses(): Promise<Course[]> {
    const unapprovedCourses = await this.courseService.getAllUnapproved();
    return unapprovedCourses;
  }

  @Get('unapproved/:courseId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getUnapCourseById(@Param('courseId', ParseIntPipe) courseId: number): Promise<Course> {
    const unapprovedCourse = await this.courseService.getUnapprovedCourseById(courseId);
    return unapprovedCourse;
  }

  @Get('')
  async findAll(): Promise<Course[]> {
  try {
      const courses = await this.courseService.findAll();
      return courses;
  } catch (error) {
      throw new NotFoundException('No approved courses found.');
    }
 } 
    
    @Get('search')
    async searchByKeyword(@Query('keyword') keyword: string): Promise<Course[]> {
      try { 
        const courses = await this.courseService.searchByKeyword(keyword);
       
        if (courses.length === 0) {
          throw new NotFoundException('No courses found.');
        }
        return courses;
      } catch (error) {
        
        throw new NotFoundException('No courses found.');
      } 
    }

    @Get(':courseId')
    async findOne(@Param('courseId', ParseIntPipe) courseId: number) {

      try {
        return await this.courseService.findOne(courseId);
      }   
      catch (error) { 
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
      }
        throw error;
      }
    }
    

    @Patch(':courseId')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.USER)
    async update(
      @Param('courseId', ParseIntPipe) courseId: number,
      @Body() updateCourseDto: UpdateCourseDto,
      @Req() req) {
      try {
        const userId = req.user.id;
        const updatedCourse = await this.courseService.update(courseId, updateCourseDto, userId);
        if (!updatedCourse) {
          throw new NotFoundException('Course not found.');
        }
        return updatedCourse;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException('Course not found.');
        }
        throw new NotFoundException('Failed to update the course.');
      }
    }

    @Delete('admin/:courseId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    removeCourse(@Param('courseId', ParseIntPipe) courseId: number, @Req() req) {
      if (req.user.role !== Role.ADMIN) {
        throw new UnauthorizedException('Unauthorized');
      }
      return this.courseService.removeCoursebyAdmin(courseId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':courseId')
    async deleteCourse(
      @Param('courseId') courseId: number,
      @Req() req,
    ): Promise<void> {
      const user: User= req['user'];
      await this.courseService.deleteCourseIfNoPurchases(courseId, user.id);
    }

    @Patch(':courseId/approve')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async approveCourse(
      @Param('courseId') courseId: number,
    ): Promise<Course> {
      try {
        const updatedCourse = await this.courseService.updateApproval(courseId, true);

        // if (!updatedCourse) {
        //   throw new NotFoundException('Course not found.');
        // }

        const creator = updatedCourse.creator;
        await this.userRepository.save(creator);


        return updatedCourse;
      } catch (error) {

        if (error instanceof ConflictException) {
          throw error;
        }
    
        throw new BadRequestException('Failed to update the course.');
      }
    }

    @Get(':id/mycourses')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.USER)
    async findUserCourses(@Param('id') userId: number, @Req() req): Promise<Course[]> {
      if (req.user.id === userId) {
        return this.courseService.findUserCourses(userId);
      } else {
        throw new UnauthorizedException('Unauthorized');
      }
    }
    

    //a buyer can comment once one course that he bought
    @Post(':courseId/comment')
    @UseGuards(JwtAuthGuard)
    async addComment(
      @Param('courseId') courseId: number,
      @Req() req,
      @Body('comment') comment: string,
    ): Promise<Course> {
      const user: User = req['user'];

      return this.courseService.addCommentToCourse(courseId, user.id, comment);
    }

    @Post(':courseId/review-stars/')
    @UseGuards(JwtAuthGuard)
    async updateCourseStars(
      @Param('courseId') courseId: number,
      @Body('stars') stars: number,
      @Req() req
    ): Promise<Course> {
      try {
        const userId = req.user.id;
        const updatedCourse = await this.courseService.updateCourseStars(courseId, userId, stars);
        return updatedCourse;
      } catch (error) {
        // Catch any errors thrown by the service and propagate them through the controller
        throw error;
      }
    }
  }



