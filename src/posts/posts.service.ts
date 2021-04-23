import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { PostFlair } from './post-flair.enum';
import { Posts } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostRepository) 
        private postRepository: PostRepository,

        @InjectRepository(CommentRepository)
        private commentRepository: CommentRepository,
    ) {}
    
    // Post
    async getPosts(filterDto: GetPostsFilterDto): Promise<Posts[]> {
        return this.postRepository.getPosts(filterDto);
    }

    async getPostById(id: number): Promise<Posts> {
        const found = await this.postRepository.findOne(id)

        if (!found) {
            throw new NotFoundException(`Post with "${id}" not found`);
       }

       return found;
    }

    async createPost(createPostDto: CreatePostDto): Promise<Posts> {
        return this.postRepository.createPost(createPostDto);
    }

    async deletePost(id: number): Promise<void> {
        const result = await this.postRepository.delete(id);
        
        if (result.affected === 0) {
            throw new NotFoundException(`Post with "${id}" not found`);
        }
    }

    async updatePost(id: number, headline: string, description: string, flair: PostFlair): Promise<Posts> {
        const post = await this.getPostById(id);
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
        await post.save();

        return post;
    }

    // Comment

    async createComment(id: number, createCommentDto: CreateCommentDto): Promise<Comments> {
        return await this.postRepository.createComment(id, createCommentDto);
    }

    async getComments(id: number) {
        return await this.commentRepository.getComments(id);
    }

    async getCommentById(id: number, commentId: number): Promise<Comments> {
        return await this.commentRepository.getCommentById(id, commentId);
    }

    async deleteCommentById(commentId: number): Promise<void> {
        const result = await this.commentRepository.delete(commentId);
        
        if (result.affected === 0) {
            throw new NotFoundException(`Comment with "${commentId}" not found`);
        }
    }

    async deleteComments(id: number): Promise<void> {
        const result = await this.commentRepository.delete({ post: {id}})
        
        if (result.affected === 0) {
            throw new NotFoundException(`No comments in this post.`);
        }
    }

    async updateComment(id: number, commentId: number, createCommentDto: CreateCommentDto): Promise<Comments> {
        const { comment } = createCommentDto;
        const commentUpdate = await this.getCommentById(id, commentId);
        commentUpdate.comment = comment;
        commentUpdate.timestamp = new Date();
        await commentUpdate.save();

        return commentUpdate;
    }

    async getAllPostsAndComments() {
        const all = await this.commentRepository.getAllPostsAndComments();
        return all;
    }
}
