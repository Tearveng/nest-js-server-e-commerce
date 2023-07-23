import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createPasswordHashed, validatePassword } from 'src/utils/password';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';
import { UserEntity } from './entities/user.entity';
import { UserType } from './enum/user-type.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Create user 
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findUserByEmail(createUserDto.email).catch(() => undefined);
    if(user) {
      throw new BadRequestException('email registered in system.')
    }

    const passwordHashed = await createPasswordHashed(createUserDto.password);
    
    return this.userRepository.save({
      ...createUserDto,
      typeUser: UserType.USER,
      password: passwordHashed
    });
  }
  // Find user by email
  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`Email: ${email} Not Found`);
    }
    return user;
  }

  // Get all users
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  // Find user by id
  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new NotFoundException(`UserId: ${userId} Not Found`);
    }

    return user
  }

  // Update password user
  async updatePasswordUser(updatePasswordDto: UpdatePasswordDto, userId: number): Promise<UserEntity> {
    const user = await this.findUserById(userId);

    const passwordHashed = await createPasswordHashed(
      updatePasswordDto.newPassword,
    );

    const isMatch = await validatePassword(updatePasswordDto.lastPassword, user.password || '')

    if (!isMatch) {
      throw new BadRequestException('Last password invalid');
    }

    return this.userRepository.save({
      ...user,
      password: passwordHashed,
    });

  }

  // Reset password
  async resetPassword(password: string, userId: number): Promise<UserEntity> {
    const user = await this.findUserById(userId);
    const passwordHashed = await createPasswordHashed(password);

    return this.userRepository.save({
      ...user,
      password: passwordHashed
    })
  }
}
