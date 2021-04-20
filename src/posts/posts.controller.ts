import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { PostFlairValidationPipe } from './pipes/post-flair-validation.pipe';
import { PostEntry, PostFlair } from './posts.model';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    getPosts(@Query(ValidationPipe) filterDto: GetPostsFilterDto): PostEntry[] {
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
    @UsePipes(ValidationPipe)
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

    // @Patch('/:id/post')
    // @UsePipes(ValidationPipe)
    // updatePost(
    //     @Param('id') id: string, 
    //     @Body() createPostDto: CreatePostDto) {
    //         return this.postsService.updatePost(id, createPostDto);
    // }

    @Patch('/:id/post')
    @UsePipes(ValidationPipe)
    updatePost(
        @Param('id') id: string, 
        @Body('headline') headline: string,
        @Body('description') description: string,
        @Body('flair', PostFlairValidationPipe) flair: PostFlair ) {
            return this.postsService.updatePost(id, headline, description, flair);
    }
    
}   
