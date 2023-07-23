import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class ForgotPassDto {
    @IsEmail()
    @ApiProperty()
    email: string
}

export class uuidExpired {
    @IsString()
    @ApiProperty()
    uuid: string
}