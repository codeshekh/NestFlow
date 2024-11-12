import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TaskDTO {
  @ApiProperty({
    description: 'The ID of the task',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The title of the task',
    example: 'Complete DSA Assignment',
  })
  title: string;

  @ApiPropertyOptional({
    description: 'The description of the task',
    example: 'Solve all the DSA questions from the linked list section.',
  })
  description?: string;

  @ApiProperty({
    description: 'The difficulty level of the task',
    example: 'Medium',
  })
  difficulty: string;

  @ApiProperty({
    description: 'Time commitment required for the task in minutes',
    example: 120,
  })
  timeCommitment: number;

  @ApiProperty({
    description: 'The domain/subject area of the task',
    example: 'Data Structures',
  })
  domain: string;

  @ApiPropertyOptional({
    description: 'The due date for the task',
    example: '2024-11-10T12:34:56Z',
  })
  dueDate?: Date;

  @ApiProperty({
    description: 'The status of the task',
    example: false
  })
  status: Boolean;

  @ApiPropertyOptional({
    description: 'The reason for the task completion',
    example: 'Completed the assignment ahead of time.',
  })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Any feedback for the task',
    example: 'Good practice for understanding linked lists.',
  })
  feedback?: string;

  @ApiProperty({
    description: 'The session ID associated with the task',
    example: 1,
  })
  sessionId: number;

  @ApiProperty({
    description: 'The date and time when the task was created',
    example: '2024-11-08T12:34:56Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the task was last updated',
    example: '2024-11-08T12:34:56Z',
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'The date and time when the task was completed (optional)',
    example: '2024-11-09T12:34:56Z',
  })
  completionTime?: Date;
}
