import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './auth/auth.module';
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
import { FastapiController } from './fastapi/fastapi.controller';
import { FastapiService } from './fastapi/fastapi.service';
import { FastapiModule } from './fastapi/fastapi.module';
import { HttpModule } from '@nestjs/axios';
import { MailService } from './mail/mail.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SessionsModule,
    TaskModule,
    NotificationModule,
    FastapiModule,
    HttpModule, // Make sure HttpModule is imported here

    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    AppController,
    UsersController,
    SessionsController,
    TaskController,
    NotificationController,
    FastapiController,
  ],
  providers: [
    AppService,
    PrismaService,
    SessionsService,
    TaskService,
    NotificationService,
    FastapiService,
    UsersService,
    MailService,
  ],
  exports: [PrismaService], // You don't need to export HttpService here anymore
})
export class AppModule {}
