import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsOptional, IsDate, IsJSON } from 'class-validator';

export class CreateSessionDTO {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the user associated with this session',
    example: 1,
  })
  userId: number;

  @IsOptional()
  @IsJSON()
  @ApiPropertyOptional({
    description: 'The JSON prompt data associated with the session',
    example: { question: 'What is your favorite color?' },
  })
  prompt?: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The user’s choice in response to the prompt',
    example: 'Blue',
  })
  choice: string;

  @IsDate()
  @ApiProperty({
    description: 'The date and time of the session',
    example: '2024-11-08T12:34:56Z',
  })
  date: Date;
}
