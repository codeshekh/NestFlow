import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/library';
import { IsInt, IsString, IsOptional, IsDate, IsJSON } from 'class-validator';

export class SessionDTO {
  @ApiProperty({
    description: 'The ID of the session',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'The ID of the user associated with this session',
    example: 1,
  })
  @IsInt()
  userId: number;

  @ApiPropertyOptional({
    description: 'The JSON prompt data associated with the session',
    example: { question: 'What is your favorite color?' },
  })
  @IsOptional()
  @IsJSON()
  prompt?: JsonValue;

  @ApiProperty({
    description: 'The user’s choice in response to the prompt',
    example: 'Blue',
  })
  @IsString()
  choice: string;

  @ApiProperty({
    description: 'The date and time of the session',
    example: '2024-11-08T12:34:56Z',
  })
  @IsDate()
  date: Date;
}
