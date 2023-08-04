import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { courseDifficulty } from '../entities/course.entity';

export class CreateCourseDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'Diego: Dealing with Anger' })
    title: string;
  
    @IsNotEmpty()
    @ApiProperty({ example: 'This course will take you on a journey about dealing with feelings of anger' })
    description: string;
  
    @IsNotEmpty()
    @ApiProperty({ example: 'Easy' })
    difficulty: courseDifficulty;
  
    @IsNotEmpty()
    @ApiProperty({ example: 'Personal Development' })
    topic: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'Lorem Ipsum' })
    content: string;

    creatorId: number;
}
