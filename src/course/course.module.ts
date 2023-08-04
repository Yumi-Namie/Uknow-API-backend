import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { UserModule } from '../user/user.module';
import { PurchaseModule } from '../purchase/purchase.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Course, User]),UserModule, PurchaseModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
