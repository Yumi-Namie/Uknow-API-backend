import { PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';
import { courseDifficulty } from '../entities/course.entity';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    title?: string;
    description?: string;
    topic?: string;
    content?: string;
    difficulty?: courseDifficulty;
}
