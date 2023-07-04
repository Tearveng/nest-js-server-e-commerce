import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { Roles } from "src/decorators/roles.decorator";
import { CreateUserDto } from "./dtos/createUser.dto";
import { ReturnUserDto } from "./dtos/returnUser.dto";
import { UpdatePasswordDto } from "./dtos/updatePassword.dto";
import { UserEntity } from "./entities/user.entity";
import { UserType } from "./enum/user-type.enum";
import { UserService } from "./user.service";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

    @Roles(UserType.ADMIN)
    @Get('/all')
    async getAllUsers(): Promise<ReturnUserDto[]> {
        const users = await this.userService.getAllUsers();

        return users.map(user => new ReturnUserDto(user));
    }

    @Roles(UserType.ADMIN)
    @Get('/:userId')
    async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto | string> {
        const userEntity: UserEntity | null = await this.userService.findUserById(userId);
        
        if(userEntity) {
            return new ReturnUserDto(userEntity)
        }

        return "User not found";
    }

    @Roles(UserType.ADMIN, UserType.USER)
    @Patch('/update-password/:userId')
    @UsePipes(ValidationPipe)
    async updatePasswordUser(@Body() updatePassworDto: UpdatePasswordDto, @Param('userId') userId: number): Promise<UserEntity> {
        return this.userService.updatePasswordUser(updatePassworDto, userId);
    }

}