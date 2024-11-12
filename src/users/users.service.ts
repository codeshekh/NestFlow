import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dtos/create.users.dtos';
import { UpdateUserDto } from './dtos/update.users.dtos';
import { UserDto } from './dtos/user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}


  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.prisma.user.create({
        data: createUserDto,
      });
      return newUser;
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
  
        throw new ConflictException('A user with this email already exists');
      } else {
        
        console.error('Error creating user:', error);
        throw new InternalServerErrorException('Error creating user');
      }
    }
  }

  async update(id: number, updateUserDto:UpdateUserDto){
    try{
      const existingUser = await this.prisma.user.findUnique({
        where: {
          id
        },
      });
      if(!existingUser){
        throw new NotFoundException(`User with ID ${id} is not exist`)
      }
const updatedUser = await this.prisma.user.update({
  where : {id},
  data: updateUserDto,
});
   
return updatedUser;
}catch(error){
  if(error.code==='P2002' && error.meta?.target?.includes('email')){
    throw new ConflictException('A user with this email already exists');
  }else {
    console.error('Error updating user:',error);
    throw new InternalServerErrorException('Error updating user');
  }
}
  }


async findOne(id: number){
  try{
    const user =  await this.prisma.user.findUnique({
      where: {id},
    });
    if(!user){
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }catch(error){
    console.error('Error retrieving user: ',error);
    throw new InternalServerErrorException('Error retrieving user');
  }
}

async getUserByEmail(email: string): Promise<UserDto> {
  try {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // If user is not found, throw a NotFoundException
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    // Return user details as UserDTO
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      password: user.password,
    };
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw new InternalServerErrorException('Error fetching user by email');
  }
}


async findAll(){
  try{
    return await this.prisma.user.findMany();
  }catch(error){
    console.error('Error retrieving users: ',error);
    throw new InternalServerErrorException('Error retrieving users');
  }
}


async remove(id: number){
  try{
const user = await this.prisma.user.findUnique({
  where: {id},
});
if(!user){
  throw new NotFoundException(`User with Id ${id} not found`);
}

await this.prisma.user.delete({
  where: {id},
});
return {message: `User with ID ${id} successfully deleted `};
  }catch(error){
console.error('Error deleting user:',error);
throw new InternalServerErrorException('Error deleting user');
  }
}
}

