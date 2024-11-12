import { Controller, Post, Body, Delete, Param, Put, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.users.dtos';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update.users.dtos';

@ApiTags('users') 
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Create a user
  @Post()
  @ApiOperation({ summary: 'Create a new user' }) // Brief description for Swagger
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: CreateUserDto, 
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict. A user with this email already exists.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation errors or missing data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

@Delete(':id')
@ApiOperation({summary: 'Delete a user by ID'})
@ApiResponse({
  status: 200,
  description: 'The user has been successfully Deleted.',
})
@ApiResponse({
  status: 500,
  description: 'Internal Server Error.',
})
 async remove(@Param('id') id: string): Promise<{message: string}>{
    return this.userService.remove(parseInt(id));
 }

 @Put(':id')
 @ApiOperation({ summary: 'Update an existing user by ID' })
 @ApiResponse({
   status: 200,
   description: 'User successfully updated.',
   type: UserDto,
 })
 @ApiResponse({
   status: 404,
   description: 'User not found.',
 })
 @ApiResponse({
   status: 409,
   description: 'Conflict. A user with this email already exists.',
 })
 @ApiResponse({
   status: 500,
   description: 'Internal Server Error.',
 })
 @ApiBody({
  description: 'The data to update an existing user',
  type: UpdateUserDto,
  examples: {
    example1: {
      summary: 'Update user example',
      description: 'Example payload for updating user information',
      value: {
        name: 'John Doe',
        email: 'thepandeyop@gmail.com',
        password: 'ndjisncdsjci',
      },
    },
  },
})
 async update(
  @Param('id') id: string,
  @Body() updateUserDto: UpdateUserDto,
 ): Promise<UserDto>{
  return this.userService.update(parseInt(id),updateUserDto);
 }

 @Get()
 @ApiOperation({ summary: 'Retrieve a list of all users' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved list of users.',
    type: [UserDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
 async findAll():Promise<UserDto []>{
  return this.userService.findAll();
 }

 @Get(':id')
 @ApiOperation({ summary: 'Retrieve a single user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User successfully retrieved.',
    type: UserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
 async findOne(@Param('id') id: string): Promise<UserDto>{
  return this.userService.findOne(parseInt(id));
 }

}

