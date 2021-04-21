import { EntityRepository, Repository } from "typeorm";
import { Comments } from "./comment.entity";

@EntityRepository(Comments)
export class CommentRepository extends Repository<Comments> {
    async getAllPostsAndComments() {
        const query = this.createQueryBuilder('comments');
        const comments = await query
            .leftJoinAndSelect('comments.post', 'posts')
            .getMany();
        return(comments);
    }

    async getComments(id: number): Promise<Comments[]> {
        const query = this.createQueryBuilder('comments');
        const comments = await query
            .leftJoinAndSelect('comments.post', 'posts')
            .where('comments.postId = :id', { id })
            .getMany();
        return(comments);
    }

    async getCommentById(id: number, commentId: number) {
        const query = this.createQueryBuilder('comments');
        const comments = await query
            .leftJoinAndSelect('comments.post', 'posts')
            .where('comments.postId = :id', { id })
            .andWhere('comments.id = :commentId', { commentId })
            .getOne();
        return(comments);
    }
}