import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Lesson {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    begin_date: Date;

    @Column()
    home_work: string;

    @Column({default: null})
    lesson_img: string;
    
    @ManyToOne(()=> User, user=> user.lessons)
    user: User;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    

}
