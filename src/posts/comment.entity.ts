import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./post.entity";

@Entity()
export class Comments extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;

    @Column()
    timestamp: Date;

    @ManyToOne(() => Posts, post => post.comments, { eager: false, onDelete: 'CASCADE' })
    post: Posts;

    @Column()
    postId: number;
}