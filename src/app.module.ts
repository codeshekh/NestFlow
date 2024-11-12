import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { SessionsController } from './sessions/sessions.controller';
import { SessionsService } from './sessions/sessions.service';
import { SessionsModule } from './sessions/sessions.module';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
@Module({
  imports: [
    AuthModule,
    UsersModule, // Ensure UsersModule is imported here if not already
    SessionsModule,
    TaskModule,
    NotificationModule,
  ],
  controllers: [
    AppController,
    UsersController,
    SessionsController,
    TaskController,
    NotificationController,
  ],
  providers: [
    AppService,
    PrismaService,
    SessionsService,
    TaskService,
    NotificationService,
  ],
  exports: [PrismaService], // Export PrismaService for dependency injection in other modules
})
export class AppModule {}
 // Export PrismaService for dependency injection in other modules

