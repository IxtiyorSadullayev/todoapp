import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export type TodoStatus = "start"| "progress"| "complated"

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(()=> User, (user) => user.todos)
    user: User;

    @Column({
        default: "start"
    })
    status: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

}
