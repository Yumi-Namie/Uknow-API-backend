import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../course/entities/course.entity';
import { UserModule } from '../user/user.module';
import { Purchase } from './entities/purchase.entity';
import { User } from 'src/user/entities/user.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Course, Purchase, User]),
  UserModule],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService]

})
export class PurchaseModule {}
