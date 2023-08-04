import { ApiTags } from "@nestjs/swagger";
import { Course } from "../../course/entities/course.entity";
import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ApiTags('purchase')
@Entity()
export class Purchase {

    @PrimaryGeneratedColumn()
    purchaseId: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    buyer: User;

    @ManyToOne(() => Course, course => course.courseId)
    @JoinColumn({ name: 'courseId', referencedColumnName: 'courseId' })
    course: Course;

    //@Column({ default: () => 'CURRENT_TIMESTAMP' })
    @CreateDateColumn()
    created_at: Date;

    //@Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @UpdateDateColumn()
    updated_at: Date;

    @Column({ default:false})
    reviewed: boolean;

    @Column({ default: false })
    commented: boolean;

}
