import { EntityRepository, Repository } from "typeorm";
import { Comments } from "./comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CreatePostDto } from "./dto/create-post.dto";
import { GetPostsFilterDto } from "./dto/get-posts-filter.dto";
import { Posts } from "./post.entity";

@EntityRepository(Posts)
export class PostRepository extends Repository<Posts> {

    async getPosts(filterDto: GetPostsFilterDto): Promise<Posts[]> {
        const { flair, search } = filterDto;
        const query = this.createQueryBuilder('posts');
        
        if (flair) {
            query.andWhere('posts.flair =  :flair', { flair })
        }

        if (search) {
            query.andWhere('posts.headline LIKE :search OR posts.description LIKE :search', { search: `%${search}%` })
        }

        const posts = await query.getMany();
        return posts;
    }

    async createPost(createPostDto: CreatePostDto): Promise<Posts> {
        const { headline, description, flair } = createPostDto;

        const post = new Posts();
        post.headline = headline;
        post.description = description;
        post.flair = flair;
        post.timestamp = new Date();
        await post.save();

        return post;
    }

    async createComment(id: number, createCommentDto: CreateCommentDto): Promise<Comments> {
        const { comment } = createCommentDto;

        const postComment = new Comments();
        postComment.postId = id;
        postComment.comment = comment;
        postComment.timestamp = new Date();
        await postComment.save()

        return postComment;
    }
}