import { ApiProperty,ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateSessionDTO{
    @ApiPropertyOptional({
        description: 'The ID of the user associated woith this session',
        example: 1,
    })
    userId?: number;

    @ApiPropertyOptional({
        description: 'The JSON prompt data associated with the session',
        example: {question: 'What is your Favorite Color?'},
    })
    prompt?: Record<string,any>;

    @ApiPropertyOptional({
        description: 'The users choice in response to the prompt ',
        example: 'Leetcode',
    })
    choice?: string;

    @ApiPropertyOptional({
        description: 'the date and time of the session',
        example: '2024-11-08T12:34:56Z',
    })
    date?: Date;
}