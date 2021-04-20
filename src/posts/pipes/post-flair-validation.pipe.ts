import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { PostFlair } from "../posts.model";

export class PostFlairValidationPipe implements PipeTransform {
    readonly allowedFlairs = [
        PostFlair.BIRTHDAY,
        PostFlair.EVENT,
        PostFlair.GENERAL
    ]

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();
        
        if (!this.isFlairValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid flair`);
        }
        
        return value;
    }

    private isFlairValid(flair: any) {
        const idx = this.allowedFlairs.indexOf(flair);
        return idx !== -1;
    }
}