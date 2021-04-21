import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Comments } from "src/posts/comment.entity";
import { Posts } from "src/posts/post.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'whiteboard',
    autoLoadEntities: true,
    synchronize: true,
}