import { Body, Controller, Post } from '@nestjs/common';
import { FastapiService } from './fastapi.service';
@Controller('fastapi')
export class FastapiController {
    constructor(private readonly fastApiService: FastapiService){}

    @Post('generate-question')
    async generateQuestion(@Body('prompt') prompt: string): Promise<any>{
        return this.fastApiService.generateQuestion(prompt);
    }
}
