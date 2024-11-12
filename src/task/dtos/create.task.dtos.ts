import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsDate, IsBoolean } from 'class-validator';

export class CreateTaskDTO {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Complete project documentation',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'The description of the task',
    example: 'Write documentation for the new project',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The difficulty level of the task',
    example: 'Medium',
  })
  @IsString()
  difficulty: string;

  @ApiProperty({
    description: 'The estimated time commitment for the task in hours',
    example: 3,
  })
  @IsInt()
  timeCommitment: number;

  @ApiProperty({
    description: 'The domain of the task (e.g., backend, frontend)',
    example: 'Backend',
  })
  @IsString()
  domain: string;

  @ApiPropertyOptional({
    description: 'The due date for the task',
    example: '2024-12-01T10:00:00Z',
  })
  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @ApiProperty({
    description: 'The status of the task, whether it is completed or not',
    example: false,
  })
  @IsBoolean()
  status: boolean;

  @ApiPropertyOptional({
    description: 'The reason for the task (if any)',
    example: 'To improve documentation',
  })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({
    description: 'Feedback related to the task (if any)',
    example: 'Needs improvement in clarity',
  })
  @IsOptional()
  @IsString()
  feedback?: string;

  @ApiProperty({
    description: 'The session ID that this task is related to',
    example: 1,
  })
  @IsInt()
  sessionId: number;
}
