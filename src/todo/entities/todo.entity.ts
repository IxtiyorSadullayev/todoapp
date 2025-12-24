import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @OneToMany(()=> User, (user) => user.todos)
    user: User;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

}
