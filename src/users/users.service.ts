import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dtos/create.users.dtos';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dtos/update.users.dtos';
import { UserDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
// import { BloomFilter } from 'bloom-filters';

@Injectable()
export class UsersService {

  private readonly jwtSecret:string;
  // private readonly bloomFilter : BloomFilter;

  constructor(
    private readonly prisma: PrismaService, 
    private readonly configService: ConfigService
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET', 'nothing');
    //const savedFilter = await  this.loadBloomFilterFromDatabase();
   // this.bloomFilter = savedFilter ? BloomFilter.fromJSON(savedFilter): new BloomFilter(1000,4);
  }

  // private async saveBloomFilterToDatabase(): Promise<void> {
  //   //const serializedFilter = JSON.stringify(this.bloomFilter.saveAsJSON());
    
  //   await this.prisma.user.upsert({
  //     where: { key: 'bloom_filter' },
  //     update: { value: serializedFilter },
  //     create: { key: 'bloom_filter', value: serializedFilter },
  //   });
  // }

  // private async loadBloomFilterFromDatabase(): Promise<any | null> {
  //   const state = await this.prisma.user.findUnique({
  //     where: { key: 'bloom_filter' },
  //   });
  //   return state ? JSON.parse(state.name) : null;
  // }

  
  async create(createUserDto: CreateUserDto) {
    try {

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const newUser = await this.prisma.user.create({
        data: {...createUserDto,password:hashedPassword },
      });

// bloom-filter
//  this.bloomFilter.add(newUser.name);

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


  // async validateUsername(username: string): Promise<boolean> {
  //   const normalizedUsername = username.toLowerCase();
  //   if (this.bloomFilter.has(normalizedUsername)) {
  //     const userExists = await this.prisma.user.findFirst({
  //       where: { name: normalizedUsername }, 
  //     });
  //     return !!userExists;
  //   }
  //   return false;
  // }

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
      where: {id : Number(id)},
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
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

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

async getUserByEmailOrUsername(identifier: string): Promise<UserDto> {
  try {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier }, 
          { name: identifier },  
        ],
      },
    });

    if (!user) {
      throw new NotFoundException(`User with email or username "${identifier}" not found`);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      password: user.password,
    };
  } catch (error) {
    console.error('Error fetching user by email or username:', error);
    throw new InternalServerErrorException('Error fetching user by email or username');
  }
}

private generateJwtToken(payload : {id: number; name: string; email: string}): string{
  const options = {expiresIn: '1h'};
  return jwt.sign(payload, this.jwtSecret,options);
}

async login(identifier: string, password: string){
  try{
    const user = await this.getUserByEmailOrUsername(identifier);
if(!user){
  throw new ConflictException('User not Found');
}
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
      throw new ConflictException('Invalid Credentials');
    }

    const token = this.generateJwtToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      
      token,
    };
  }catch (error) {
    console.error('Error during login:', error);
    throw new InternalServerErrorException('Error during login');
  }
}


}

