import { Injectable,HttpException } from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class FastapiService {
    private readonly fastapiBaseUrl = 'http://127.0.0.1:8000';

    constructor(private readonly httpService: HttpService){}

    async generateQuestion(prompt: string): Promise<any>{
        try{
        const response = await lastValueFrom(
            this.httpService.post(`${this.fastapiBaseUrl}/api/v1/generate-question`,{prompt}),);
            return response.data;
        }
        catch(error){
  const message = console.error('Unexcepted');
        }
    }
}
