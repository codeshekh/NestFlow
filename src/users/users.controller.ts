import { Controller, Post, Body, Delete, Param, Put, Get, Query, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.users.dtos';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
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


  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    description: 'Login credentials (email or username and password)',
    schema: {
      type: 'object',
      properties: {
        identifier: { type: 'string', description: 'Email or Username', example: 'abhishek1518@gmail.com' },
        password: { type: 'string', description: 'Password', example: 'yourpassword' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        user: { $ref: '#/components/schemas/UserDto' },
        token: { type: 'string', description: 'JWT Token for authentication' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
async login(
  @Body('identifier') identifier: string,
  @Body('password') password: string,
) {
  return this.userService.login(identifier, password);
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
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

//  @Get('validate-username')
//   @ApiOperation({ summary: 'Validate if a username might exist using a Bloom filter' })
//   @ApiQuery({
//     name: 'username',
//     required: true,
//     description: 'The username to validate',
//     type: String,
//   })
//   @ApiResponse({
//     status: 200,
//     description: 'Indicates whether the username might exist',
//     schema: {
//       example: {
//         exists: true,
//       },
//     },
//   })
//   @ApiResponse({
//     status: 400,
//     description: 'Bad Request. Username is missing or invalid.',
//   })
  // async validateUsername(@Query('username') username: string): Promise<{ exists: boolean }> {
  //   if (!username || username.trim() === '') {
  //     throw new BadRequestException('Username is required');
  //   }

  //   // const exists = await this.userService.validateUsername(username);
  //   // return { exists }; 
  // }

}

