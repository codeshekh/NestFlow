// notification.service.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateNotificationDTO } from './dtos/create.notification.dtos';
import { UpdateNotificationDTO } from './dtos/update.notification.dtos';
import { NotificationDTO } from './dtos/notification.dtos';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(createNotificationDTO: CreateNotificationDTO): Promise<NotificationDTO> {
    try {
      const notification = await this.prisma.notification.create({
        data: {
          userId: createNotificationDTO.userId,
          type: createNotificationDTO.type,
          message: createNotificationDTO.message,
        },
      });

      return {
        id: notification.id,
        userId: notification.userId,
        type: notification.type,
        message: notification.message,
        isRead: notification.isRead,
        sentAt: notification.sentAt,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error creating notification');
    }
  }

  async updateNotification(id: number, updateNotificationDTO: UpdateNotificationDTO): Promise<NotificationDTO> {
    try {
      const notification = await this.prisma.notification.findUnique({ where: { id } });

      if (!notification) {
        throw new NotFoundException(`Notification with ID ${id} not found`);
      }

      const updatedNotification = await this.prisma.notification.update({
        where: { id },
        data: updateNotificationDTO,
      });

      return {
        id: updatedNotification.id,
        userId: updatedNotification.userId,
        type: updatedNotification.type,
        message: updatedNotification.message,
        isRead: updatedNotification.isRead,
        sentAt: updatedNotification.sentAt,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error updating notification');
    }
  }

  async getOneNotification(id: number): Promise<NotificationDTO> {
    const notification = await this.prisma.notification.findUnique({ where: { id } });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return {
      id: notification.id,
      userId: notification.userId,
      type: notification.type,
      message: notification.message,
      isRead: notification.isRead,
      sentAt: notification.sentAt,
    };
  }

  async getAllNotifications(): Promise<NotificationDTO[]> {
    const notifications = await this.prisma.notification.findMany();

    return notifications.map((notification) => ({
      id: notification.id,
      userId: notification.userId,
      type: notification.type,
      message: notification.message,
      isRead: notification.isRead,
      sentAt: notification.sentAt,
    }));
  }

  async deleteNotification(id: number): Promise<{ message: string }> {
    const notification = await this.prisma.notification.findUnique({ where: { id } });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    await this.prisma.notification.delete({ where: { id } });

    return { message: 'Notification successfully deleted.' };
  }
}
