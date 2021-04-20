import { EntityRepository, Repository } from "typeorm";
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
}