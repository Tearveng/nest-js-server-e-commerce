import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { RefreshTokenDto } from "./dtos/refreshToken.dto";
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
}