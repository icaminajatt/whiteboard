import { PostFlair } from "../posts.model";

export class CreatePostDto {
    headline: string;
    description: string;
    flair: PostFlair;
}