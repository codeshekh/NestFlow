import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  providers: [SessionsService,PrismaService],
  controllers: [SessionsController],
  exports: [SessionsService],
})
export class SessionsModule {}
