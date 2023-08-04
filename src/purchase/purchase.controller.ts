import { Controller, Get, Post, Body, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Course } from '../course/entities/course.entity';
import { User } from '../user/entities/user.entity';
import { Purchase } from './entities/purchase.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../user/entities/role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiBearerAuth()
@ApiTags('purchase')
@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('')
  async createPurchase(
    @Body() createPurchaseDto: CreatePurchaseDto,
    @Req() req: Request, 
  ): Promise<Purchase> {
    const user: User = req['user'];
    createPurchaseDto.userId = user.id; 
    return this.purchaseService.makePurchase(createPurchaseDto, user);
  }

  @Get(':courseId/count')
  async countCoursePurchases(@Param('courseId') courseId: number): Promise<{ count: number }> {
    const count = await this.purchaseService.countCoursePurchases(courseId);
    return { count };
  }

  //User can see all courses purchased
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('user-courses')
    async getUserCourses(@Req() req: Request): Promise<Course[]> {
    const user: User = req['user'];
    return this.purchaseService.getUserPurchasedCourses(user);
  }

  //User can choose see one course purchased
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('user-courses/:courseId')
  async getUserPurchase(
    @Req() req: Request,
    @Param('courseId') courseId: number,
  ): Promise<Course> {
    const user: User = req['user'];
    return this.purchaseService.getUserPurchasedCourse(user, courseId);
  }

}
