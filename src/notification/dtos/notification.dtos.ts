// dtos/notification.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class NotificationDTO {
  @ApiProperty({ description: 'Unique identifier for the notification', example: 1 })
  id: number;

  @ApiProperty({ description: 'ID of the user associated with the notification', example: 1 })
  userId: number;

  @ApiProperty({ description: 'Type of the notification', example: 'info' })
  type: string;

  @ApiProperty({ description: 'Message content of the notification', example: 'Your task was completed successfully.' })
  message: string;

  @ApiProperty({ description: 'Indicates if the notification is read', example: false })
  isRead: boolean;

  @ApiProperty({ description: 'Timestamp when the notification was sent', example: new Date() })
  sentAt: Date;
}
