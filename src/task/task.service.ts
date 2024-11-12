import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/create.task.dtos';
import { PrismaService } from 'src/database/prisma.service';
import { TaskDTO } from './dtos/task.dtos';
import { UpdateTaskDTO } from './dtos/update.task.dtos';
@Injectable()
export class TaskService {
constructor(private readonly prisma: PrismaService){}

async createTask(createTaskDTO: CreateTaskDTO): Promise<TaskDTO> {
    try {
      
      const session = await this.prisma.session.findUnique({
        where: { id: createTaskDTO.sessionId },
      });

      if (!session) {
        throw new NotFoundException(`Session with ID ${createTaskDTO.sessionId} not found`);
      }

    
      const task = await this.prisma.task.create({
        data: {
          title: createTaskDTO.title,
          description: createTaskDTO.description,
          difficulty: createTaskDTO.difficulty,
          timeCommitment: createTaskDTO.timeCommitment,
          domain: createTaskDTO.domain,
          dueDate: createTaskDTO.dueDate,
          status: createTaskDTO.status,
          reason: createTaskDTO.reason,
          feedback: createTaskDTO.feedback,
          sessionId: createTaskDTO.sessionId, 
        },
      });

      return {
        id: task.id,
        title: task.title,
        description: task.description,
        difficulty: task.difficulty,
        timeCommitment: task.timeCommitment,
        domain: task.domain,
        dueDate: task.dueDate,
        status: task.status,
        reason: task.reason,
        feedback: task.feedback,
        sessionId: task.sessionId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        completionTime: task.completionTime,
      };
    } catch (error) {
      console.error('Error creating task:', error);
      throw new InternalServerErrorException('Error creating task');
    }
  }
  
  async updateTask(id: number, updateTaskDTO: UpdateTaskDTO): Promise<TaskDTO> {
    try {
    
      const task = await this.prisma.task.findUnique({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

    
      const updatedTask = await this.prisma.task.update({
        where: { id },
        data: {
          title: updateTaskDTO.title,
          description: updateTaskDTO.description,
          difficulty: updateTaskDTO.difficulty,
          timeCommitment: updateTaskDTO.timeCommitment,
          domain: updateTaskDTO.domain,
          dueDate: updateTaskDTO.dueDate,
          status: updateTaskDTO.status,
          reason: updateTaskDTO.reason,
          feedback: updateTaskDTO.feedback,
          sessionId: updateTaskDTO.sessionId,
        },
      });

      return {
        id: updatedTask.id,
        title: updatedTask.title,
        description: updatedTask.description,
        difficulty: updatedTask.difficulty,
        timeCommitment: updatedTask.timeCommitment,
        domain: updatedTask.domain,
        dueDate: updatedTask.dueDate,
        status: updatedTask.status,
        reason: updatedTask.reason,
        feedback: updatedTask.feedback,
        sessionId: updatedTask.sessionId,
        createdAt: updatedTask.createdAt,
        updatedAt: updatedTask.updatedAt,
        completionTime: updatedTask.completionTime,
      };
    } catch (error) {
      console.error('Error updating task:', error);
      throw new InternalServerErrorException('Error updating task');
    }
  }

  
  async deleteTask(id: number): Promise<{ message: string }> {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id },
      });
  
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
  
      await this.prisma.task.delete({
        where: { id },
      });
  
      return { message: 'Task successfully deleted.' }; 
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new InternalServerErrorException('Error deleting task');
    }
  }
  
  async getOneTask(id: number): Promise<TaskDTO> {
    try {
      
      const task = await this.prisma.task.findUnique({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      
      return {
        id: task.id,
        title: task.title,
        description: task.description,
        difficulty: task.difficulty,
        timeCommitment: task.timeCommitment,
        domain: task.domain,
        dueDate: task.dueDate,
        status: task.status,
        reason: task.reason,
        feedback: task.feedback,
        sessionId: task.sessionId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        completionTime: task.completionTime,
      };
    } catch (error) {
      console.error('Error getting task:', error);
      throw new InternalServerErrorException('Error getting task');
    }
  }


  async getAllTasks(): Promise<TaskDTO[]> {
    try {

      const tasks = await this.prisma.task.findMany();
      return tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        difficulty: task.difficulty,
        timeCommitment: task.timeCommitment,
        domain: task.domain,
        dueDate: task.dueDate,
        status: task.status,
        reason: task.reason,
        feedback: task.feedback,
        sessionId: task.sessionId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        completionTime: task.completionTime,
      }));
    } catch (error) {
      console.error('Error getting all tasks:', error);
      throw new InternalServerErrorException('Error getting tasks');
    }
  }

}
