import { Injectable } from '@nestjs/common';
import { PostEntry, PostFlair } from './posts.model';
import { v1 as uuid} from 'uuid';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';

@Injectable()
export class PostsService {
    private posts: PostEntry[] = [];

    getAllPosts(): PostEntry[] {
        return this.posts;
    }

    getPostsWithFilters(filterDto: GetPostsFilterDto): PostEntry[] {
        const { flair, search } = filterDto;

        let posts = this.getAllPosts();

        if (flair) {
            posts = this.posts.filter(post => post.flair === flair);
        }

        if (search) {
            posts = this.posts.filter(post =>
                post.headline.includes(search) ||
                post.description.includes(search),
            );
        }

        return posts;
    }

    getPostById(id: string): PostEntry {
        return this.posts.find(post => post.id === id);
    }

    createPost(createPostDto: CreatePostDto): PostEntry {
        const { headline, description, flair } = createPostDto;
        const post: PostEntry = {
            id: uuid(),
            headline,
            description,
            flair,
            timestamp: new Date(), 
        };
        
        this.posts.push(post);
        return post;
    }

    deletePost(id: string): void {
       this.posts = this.posts.filter(post => post.id !== id);
    }

    updatePostFlair(id: string, flair: PostFlair): PostEntry {
        const post = this.getPostById(id)
        post.flair = flair;
        return post;
    }

    updateHeadline(id: string, headline: string): PostEntry {
        const post = this.getPostById(id)
        post.headline = headline;
        return post;
    }

    updateDescription(id: string, description: string): PostEntry {
        const post = this.getPostById(id)
        post.description = description;
        return post;
    }

    updatePost(id: string, createPostDto: CreatePostDto): PostEntry {
        const { headline, description, flair } = createPostDto;
        const post = this.getPostById(id);
        if (headline !== undefined) {
            post.headline = headline;
        };
        if (description !== undefined) {
            post.description = description;
        };
        if (flair !== undefined) {
            post.flair = flair;
        };
        post.timestamp = new Date();

        console.log(post);
        return post;
    }
}
