import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateSessionDTO } from './dtos/create.sessions.dtos';
import { UpdateSessionDTO } from './dtos/update.sessions.dtos';
import { Session } from '@prisma/client';
import { SessionDTO } from './dtos/session.dto';


@Injectable()
export class SessionsService {
constructor(private readonly prisma: PrismaService){}

async createSession(createSessionDto: CreateSessionDTO) {
    try {

      const user = await this.prisma.user.findUnique({
        where: { id: createSessionDto.userId },
      });
  
      if (!user) {
        throw new NotFoundException(`User with ID ${createSessionDto.userId} not found`);
      }
  
    
      const newSession = await this.prisma.session.create({
        data: createSessionDto,
      });
      return newSession;
    } catch (error) {
      console.error('Error creating session:', error);
      throw new InternalServerErrorException('Error creating session');
    }
  }
  

async updateSession(id: number, updateSessionDto: UpdateSessionDTO): Promise<Session> {
    try {
      const existingSession = await this.prisma.session.findUnique({
        where: { id },
      });

      if (!existingSession) {
        throw new NotFoundException(`Session with ID ${id} not found`);
      }

      const updatedSession = await this.prisma.session.update({
        where: { id },
        data: updateSessionDto,
      });

      return updatedSession;
    } catch (error) {
      console.error('Error updating session:', error);
      throw new InternalServerErrorException('Error updating session');
    }
  }

async getAllSession(){
    try{
return await this.prisma.session.findMany();
    }
    catch(error){
    console.error('Error retrieving sessions:' , error);
    throw new InternalServerErrorException('Error retrieving sessions');
    }
}

async getOneSession(id: number): Promise<SessionDTO> {
    try {
      const session = await this.prisma.session.findUnique({
        where: { id },
        include: { user: true },  // You can include user data if needed
      });

      if (!session) {
        throw new NotFoundException(`Session with ID ${id} not found`);
      }

      // Map the Prisma session object to the SessionDTO
      return {
        id: session.id,
        userId: session.userId,
        prompt: session.prompt,
        choice: session.choice,
        date: session.date,
      };
    } catch (error) {
      console.error('Error retrieving session:', error);
      throw new InternalServerErrorException('Error retrieving session');
    }
  }

async deleteSession(id: number){
    try{
   const session = await this.prisma.session.findUnique({
    where: {id},
   });
   if(!session){
    throw new NotFoundException(`Session with ID ${id} not found`);
   }
   await this.prisma.session.delete({
    where: {id},
   })
   return { message: `Session with ID ${id} successfully deleted`};
    }
    catch(error){
    console.error('Error deleting Session:',error);
    throw new InternalServerErrorException('Error deleting Session');
    }
}

}
