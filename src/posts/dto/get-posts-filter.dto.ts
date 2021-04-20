import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { PostFlair } from "../post-flair.enum";

export class GetPostsFilterDto {
    @IsOptional()
    @IsIn([PostFlair.BIRTHDAY, PostFlair.EVENT, PostFlair.GENERAL])
    flair: PostFlair;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}