import { PostFlair } from "../posts.model";
import { IsNotEmpty } from 'class-validator';
export class CreatePostDto {
    @IsNotEmpty()
    headline: string;

    @IsNotEmpty()
    description: string;
    
    flair: PostFlair;
}