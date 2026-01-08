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
        type: 'enum',
        enum: ["start", "progress", "complated"],
        default: "start"
    })
    status: TodoStatus

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

}
