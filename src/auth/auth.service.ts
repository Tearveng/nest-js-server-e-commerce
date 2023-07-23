import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResetPassSerive } from 'src/resetPassword/resetPass.service';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { validatePassword } from 'src/utils/password';
import { LoginDto } from './dtos/login.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { RefreshTokenDto } from './dtos/refreshToken.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { ReturnLoginDto } from './dtos/returnLogin.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService, 
        private readonly resetPassService: ResetPassSerive,
        private jwtService: JwtService,  
    ) {}

    // Login
    async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
        const user: UserEntity | undefined = await this.userService.findUserByEmail(loginDto.email).catch(() => undefined);

        const isMatch = await validatePassword(loginDto.password, user?.password || '');
        if (!user || !isMatch) {
            throw new NotFoundException('Email or password invalid');
        }
        return {
            accessToken: this.jwtService.sign({ ...new LoginPayload(user) }, { expiresIn: '5m' }),
            refreshToken: this.jwtService.sign({ sid: user.id }, { expiresIn: '7days' }),
            user: new ReturnUserDto(user)
        };
    }

    // Refresh token
    async refreshToken(refreshToken: RefreshTokenDto): Promise<ReturnLoginDto> {
        const isValidRefreshToken = this.jwtService.decode(refreshToken.refreshToken) as { exp: number, sid: number };
        if (isValidRefreshToken) {
            const { exp, sid } = isValidRefreshToken;
            if (Date.now() < exp * 1000) {
                const user: UserEntity | undefined = await this.userService.findUserById(sid)
                return {
                    accessToken: this.jwtService.sign({ ...new LoginPayload(user) }, { expiresIn: '5m' }),
                    refreshToken: this.jwtService.sign({ sid: user.id }, { expiresIn: '7days' }),
                    user: new ReturnUserDto(user)
                };
            }
        }


        throw new BadRequestException('bad token');
    }

    // Reset password
    async resetPassword(resetPassword: ResetPasswordDto, uuid: string): Promise<boolean> {
        await this.resetPassService.uuidExpired(uuid);
        const { newPassword, confirmPassword } = resetPassword;
        if(newPassword !== confirmPassword) {
            throw new BadRequestException('Password not matched');
        }
        const resetPass = await this.resetPassService.findResetPassByUuid(uuid);

        await this.userService.resetPassword(newPassword, resetPass.user.id)
        await this.resetPassService.deleteResetPassByUuid(uuid);

        return true;
    }
}