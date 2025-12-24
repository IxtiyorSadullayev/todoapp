import { Todo } from "src/todo/entities/todo.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    fullname: string;

    @Column()
    phoneNumber: string;

    @Column()
    birthday: Date;

    @ManyToOne(()=> Todo, (todo)=> todo.user, {cascade: true})
    todos: Todo[]

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;
}
