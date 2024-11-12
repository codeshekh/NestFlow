// dtos/update-notification.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateNotificationDTO {
  @ApiPropertyOptional({ description: 'Update the notification type', example: 'warning' })
  type?: string;

  @ApiPropertyOptional({ description: 'Update the message content', example: 'Your task has been modified.' })
  message?: string;

  @ApiPropertyOptional({ description: 'Mark notification as read or unread', example: true })
  isRead?: boolean;
}
