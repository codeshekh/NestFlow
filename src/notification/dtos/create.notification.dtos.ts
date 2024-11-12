// dtos/create-notification.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDTO {
  @ApiProperty({ description: 'ID of the user receiving the notification', example: 1 })
  userId: number;

  @ApiProperty({ description: 'Type of the notification', example: 'info' })
  type: string;

  @ApiProperty({ description: 'Message content of the notification', example: 'Your task was completed successfully.' })
  message: string;
}
