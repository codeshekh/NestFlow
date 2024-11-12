import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDTO {
  @ApiPropertyOptional({
    description: 'The title of the task (optional)',
    example: 'Complete Final Exam Preparation',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'The description of the task (optional)',
    example: 'Revise the final exam syllabus.',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'The difficulty level of the task (optional)',
    example: 'Hard',
  })
  difficulty?: string;

  @ApiPropertyOptional({
    description: 'Time commitment required for the task in minutes (optional)',
    example: 150,
  })
  timeCommitment?: number;

  @ApiPropertyOptional({
    description: 'The domain/subject area of the task (optional)',
    example: 'Programming',
  })
  domain?: string;

  @ApiPropertyOptional({
    description: 'The due date for the task (optional)',
    example: '2024-12-01T12:34:56Z',
  })
  dueDate?: Date;

  @ApiPropertyOptional({
    description: 'The status of the task (optional)',
  
    example: false,
  })
  status?: boolean;

  @ApiPropertyOptional({
    description: 'The reason for the task completion (optional)',
    example: 'Completed the exam preparation ahead of time.',
  })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Any feedback for the task (optional)',
    example: 'This task was a great way to revise for the final exam.',
  })
  feedback?: string;

  @ApiPropertyOptional({
    description: 'The session ID associated with the task (optional)',
    example: 1,
  })
  sessionId?: number;
}
