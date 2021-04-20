import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
}