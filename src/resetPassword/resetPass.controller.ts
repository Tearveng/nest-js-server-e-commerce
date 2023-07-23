import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ForgotPassDto } from "./dtos/forgotPass.dto";
import { ResetPassSerive } from "./resetPass.service";

@ApiTags('reset-password')
@Controller('')
export class ResetPassController {
    constructor(private readonly resetPassService: ResetPassSerive) { }

    @UsePipes(ValidationPipe)
    @Post('/forgot-password')
    async createUser(@Body() {email}: ForgotPassDto): Promise<boolean> {
        return this.resetPassService.forgotPassword(email);
    }

    @Get('/uuid-expired/:uuid')
    async uuidExpired(@Param('uuid') uuid: string): Promise<boolean> {
        return this.resetPassService.uuidExpired(uuid);
    }
}