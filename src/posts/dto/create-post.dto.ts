import { IsNotEmpty } from 'class-validator';
import { PostFlair } from '../post-flair.enum';
export class CreatePostDto {
    @IsNotEmpty()
    headline: string;

    @IsNotEmpty()
    description: string;
    
    flair: PostFlair;
}