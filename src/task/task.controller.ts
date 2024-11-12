import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDTO } from './dtos/create.task.dtos';
import { UpdateTaskDTO } from './dtos/update.task.dtos';
import { TaskService } from './task.service';
import { TaskDTO } from './dtos/task.dtos';
@ApiTags('task')
@Controller('task')
export class TaskController {
    constructor(private readonly taskservice: TaskService){}

    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, description: 'The task has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request. Validation errors or missing data.' })
    @ApiResponse({ status: 500, description: 'Internal Task Error.' })
    async create(@Body() createtaskdto: CreateTaskDTO): Promise<TaskDTO>{
       return this.taskservice.createTask(createtaskdto) 
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an existing task by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the task to update', type: Number })
  @ApiResponse({ status: 200, description: 'The task has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'task not found.' })
  @ApiResponse({ status: 500, description: 'Internal task Error.' })
  async update(
    @Param('id') id: number,
    @Body() updatetaskdto: UpdateTaskDTO, 
  ): Promise<TaskDTO>{
    return this.taskservice.updateTask(id,updatetaskdto);
  }
  
  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all task' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved list of task.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async findAll(): Promise<TaskDTO[]> {
    return this.taskservice.getAllTasks();
  }

  
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single task by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the task to retrieve', type: Number })
  @ApiResponse({ status: 200, description: 'task successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'task not found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async findOne(@Param('id') id: string): Promise<TaskDTO> {
    const session = await this.taskservice.getOneTask(parseInt(id));

    if (!session) {
      throw new NotFoundException(`task with ID ${id} not found`);
    }

    return session;
  }

  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the task to delete', type: Number })
  @ApiResponse({ status: 200, description: 'task successfully deleted.' })
  @ApiResponse({ status: 404, description: 'task not found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.taskservice.deleteTask(parseInt(id));
  }
}
  