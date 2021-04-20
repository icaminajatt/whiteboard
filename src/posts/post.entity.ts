import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comments } from "./comment.entity";
import { PostFlair } from "./post-flair.enum";

@Entity()
export class Posts extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    headline: string;

    @Column()
    description: string;

    @Column()
    flair: PostFlair;

    @Column()
    timestamp: Date;

    @OneToMany(() => Comments, comment => comment.post, { eager: true })
    comments: Comments[];
}