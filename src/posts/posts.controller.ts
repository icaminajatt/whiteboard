import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Comments } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { PostFlairValidationPipe } from './pipes/post-flair-validation.pipe';
import { PostFlair } from './post-flair.enum';
import { Posts } from './post.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    // @Get()
    // getAllPostsAndComments() {
    //     return this.postsService.getAllPostsAndComments()
    // }

    @Get()
    getPosts(@Query(ValidationPipe) filterDto: GetPostsFilterDto): Promise<Posts[]> {
        return  this.postsService.getPosts(filterDto);
    }
    
    @Get('/:id')
    getPostById(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
        return this.postsService.getPostById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createPost(@Body() createPostDto: CreatePostDto): Promise<Posts> {
        return this.postsService.createPost(createPostDto);
    }

    @Delete('/:id')
    deletePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.postsService.deletePost(id);
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
        @Param('id', ParseIntPipe) id: number, 
        @Body('headline') headline: string,
        @Body('description') description: string,
        @Body('flair', PostFlairValidationPipe) flair: PostFlair 
        ): Promise<Posts> {
            return this.postsService.updatePost(id, headline, description, flair);
    }
    
    @Post('/:id/comments')
    createComment(
        @Param('id', ParseIntPipe) id: number,
        @Body() createCommentDto: CreateCommentDto,
    ): Promise<Comments> {
        return this.postsService.createComment(id, createCommentDto);
    }

    @Get('/:id/comments')
    getComments(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.postsService.getComments(id);
    }

    @Get('/:id/comments/:commentId')
    getCommentById(
        @Param('id', ParseIntPipe) id: number,
        @Param('commentId', ParseIntPipe) commentId: number,
    ) {
        return this.postsService.getCommentById(id, commentId);
    }

    @Delete('/:id/comments/:commentId')
    deleteCommentById(@Param('commentId', ParseIntPipe) commentId: number): Promise<void> {
        return this.postsService.deleteCommentById(commentId);
    }

    @Delete('/:id/comments')
    deleteComments(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.postsService.deleteComments(id);
    }

    @Patch('/:id/comments/:commentId')
    @UsePipes(ValidationPipe)
    updateComment(
        @Param('id', ParseIntPipe) id: number, 
        @Param('commentId', ParseIntPipe) commentId: number, 
        @Body() createCommentDto: CreateCommentDto
        ): Promise<Comments> {
            return this.postsService.updateComment(id, commentId, createCommentDto);
    }
}   
