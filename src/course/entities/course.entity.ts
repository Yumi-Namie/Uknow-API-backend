import { ApiTags } from "@nestjs/swagger";
import {  Min, Max } from "class-validator";
import { User } from "../../user/entities/user.entity";
import {  Column, Entity, PrimaryGeneratedColumn,  JoinColumn, ManyToOne } from "typeorm";



export enum courseDifficulty {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
}

export class StarValue {
  @Min(0)
  @Max(5)
  value: number;
}

@ApiTags('course')
@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    courseId: number;

    @Column({ unique: true })
    title: string;

    @Column({ unique: true })
    description: string;

    @Column({default: 200})
    price: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({ default: false})
    approved: boolean;

    @Column({
      type: 'enum',
      enum: courseDifficulty,
      default: courseDifficulty.Easy,
    })
    difficulty: courseDifficulty;

    @Column()
    topic: string;

    @Column({ type: 'decimal', precision: 2, scale: 1, default: 5 })
    rating: number;
    
    @Column({ type: 'json', nullable: true })
    stars:StarValue[];

    @Column({ type: 'json', nullable: true })
    comments: Array<{ userId: number; value: string }>;

    @Column({ type: 'text', nullable: true })
    content: string;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'creatorId', referencedColumnName: 'id' })
    creator: User;
  
  }