import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    
    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    

}
