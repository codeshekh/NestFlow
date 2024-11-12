import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateSessionDTO } from './dtos/create.sessions.dtos';
import { UpdateSessionDTO } from './dtos/update.sessions.dtos';
import { Session } from '@prisma/client';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { SessionDTO } from './dtos/session.dto';
@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService){}

    @Post()
    @ApiOperation({ summary: 'Create a new session' })
    @ApiResponse({ status: 201, description: 'The session has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request. Validation errors or missing data.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    async create(@Body( ) createsessiondto: CreateSessionDTO ): Promise<Session>{
   return this.sessionsService.createSession(createsessiondto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an existing session by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the session to update', type: Number })
  @ApiResponse({ status: 200, description: 'The session has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async update(
    @Param('id') id: number,
    @Body() updatesessiondto: UpdateSessionDTO, 
  ): Promise<Session>{
    return this.sessionsService.updateSession(id,updatesessiondto);
  }
  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all sessions' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved list of sessions.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async findAll(): Promise<Session[]> {
    return this.sessionsService.getAllSession();
  }

  
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single session by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the session to retrieve', type: Number })
  @ApiResponse({ status: 200, description: 'Session successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async findOne(@Param('id') id: string): Promise<SessionDTO> {
    const session = await this.sessionsService.getOneSession(parseInt(id));

    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }

    return session;
  }

  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a session by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the session to delete', type: Number })
  @ApiResponse({ status: 200, description: 'Session successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.sessionsService.deleteSession(parseInt(id));
  }
}

