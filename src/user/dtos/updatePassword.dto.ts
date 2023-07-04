import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class UpdatePasswordDto {
    @IsString()
    @ApiProperty()
    newPassword: string;

    @IsString()
    @ApiProperty()
    lastPassword: string
}