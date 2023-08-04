import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Course } from "src/course/entities/course.entity";
import { User } from "src/user/entities/user.entity";

export class CreatePurchaseDto {

    @ApiProperty({ example: 'ID User (buyer)' })
    userId: number;

    @IsNotEmpty()
    @ApiProperty({ example: 'ID of the course that I bought' })
    courseId: number;
}
