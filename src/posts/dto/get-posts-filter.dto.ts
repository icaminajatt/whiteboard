import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { PostFlair } from "../post-flair.enum";

export class GetPostsFilterDto {
    @IsOptional()
    @IsEnum(PostFlair)
    flair: PostFlair;

    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    year: Date;
}