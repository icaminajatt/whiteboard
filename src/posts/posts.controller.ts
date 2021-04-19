import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { PostEntry, PostFlair } from './posts.model';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    getPosts(@Query() filterDto: GetPostsFilterDto): PostEntry[] {
        if (Object.keys(filterDto).length) {
            return this.postsService.getPostsWithFilters(filterDto);
        } else {
            return this.postsService.getAllPosts();
        }    
    }
    
    @Get('/:id')
    getPostById(@Param('id') id: string): PostEntry {
        return this.postsService.getPostById(id);
    }

    @Post()
    createPost(@Body() createPostDto: CreatePostDto): PostEntry {
        return this.postsService.createPost(createPostDto);
    }

    @Delete('/:id')
    deletePost(@Param('id') id: string): void {
        this.postsService.deletePost(id);
    }

    @Patch('/:id/flair')
    updatePostFlair(@Param('id') id: string, @Body('flair') flair: PostFlair) {
        return this.postsService.updatePostFlair(id, flair);
    }

    @Patch('/:id/headline')
    updateHeadline(@Param('id') id: string, @Body('headline') headline: string) {
        return this.postsService.updateHeadline(id, headline);
    }

    @Patch('/:id/description')
    updateDescription(@Param('id') id: string, @Body('description') description: string) {
        return this.postsService.updateDescription(id, description);
    }

    @Patch('/:id/post')
    updatePost(
        @Param('id') id: string, 
        @Body() createPostDto: CreatePostDto) {
            return this.postsService.updatePost(id, createPostDto);
    }
}   
