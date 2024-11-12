// notification.controller.ts
import { Controller, Post, Put, Get, Delete, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { CreateNotificationDTO } from './dtos/create.notification.dtos';
import { UpdateNotificationDTO } from './dtos/update.notification.dtos';
import { NotificationDTO } from './dtos/notification.dtos';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiResponse({ status: 201, description: 'Notification created.', type: NotificationDTO })
  async create(@Body() createNotificationDTO: CreateNotificationDTO): Promise<NotificationDTO> {
    return this.notificationService.createNotification(createNotificationDTO);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({ status: 200, description: 'Notification updated.', type: NotificationDTO })
  async update(@Param('id') id: string, @Body() updateNotificationDTO: UpdateNotificationDTO): Promise<NotificationDTO> {
    return this.notificationService.updateNotification(parseInt(id), updateNotificationDTO);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({ status: 200, description: 'Notification retrieved.', type: NotificationDTO })
  async getOne(@Param('id') id: string): Promise<NotificationDTO> {
    return this.notificationService.getOneNotification(parseInt(id));
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiResponse({ status: 200, description: 'List of notifications.', type: [NotificationDTO] })
  async getAll(): Promise<NotificationDTO[]> {
    return this.notificationService.getAllNotifications();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({ status: 200, description: 'Notification deleted.' })
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.notificationService.deleteNotification(parseInt(id));
  }
}
