import { Todo } from "src/todo/entities/todo.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToMany(()=> Todo, (todo)=> todo.user, {cascade: true})
    todos: Todo[]

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;
}
