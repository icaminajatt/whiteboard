export interface PostEntry {
    id: string;
    headline: string;
    description: string;
    timestamp: Date;
    flair: PostFlair;
}

export enum PostFlair {
    GENERAL = 'GENERAL',
    EVENT = 'EVENT',
    BIRTHDAY = 'BIRTHDAY'
}