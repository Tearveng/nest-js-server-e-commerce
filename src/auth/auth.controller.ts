import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { RefreshTokenDto } from "./dtos/refreshToken.dto";
import { ResetPasswordDto } from "./dtos/resetPassword.dto";
import { ReturnLoginDto } from "./dtos/returnLogin.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(ValidationPipe)
    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<ReturnLoginDto> {
        return this.authService.login(loginDto);
    }

    @Post('/refreshToken')
    async refreshToken(@Body() refreshToken: RefreshTokenDto): Promise<ReturnLoginDto | null> {
        return this.authService.refreshToken(refreshToken);
    }

    @Post('/reset-password/:uuid')
    async resetPassword(@Param('uuid') uuid: string, @Body() resetPass: ResetPasswordDto): Promise<boolean> {
        return this.authService.resetPassword(resetPass, uuid)
    }
}