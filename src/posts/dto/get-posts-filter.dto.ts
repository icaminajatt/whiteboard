import { PostFlair } from "../posts.model";

export class GetPostsFilterDto {
    flair: PostFlair;
    search: string;
}