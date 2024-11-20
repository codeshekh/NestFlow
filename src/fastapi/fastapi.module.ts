import { Module } from '@nestjs/common';
import { FastapiController } from './fastapi.controller';
import { FastapiService } from './fastapi.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    controllers: [FastapiController],
    providers: [FastapiService],
    imports: [HttpModule]
})
export class FastapiModule {}
