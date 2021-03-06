import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { Posts } from './post.entity';
import { PostRepository } from './post.repository';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository, CommentRepository, Comments, Posts])
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
