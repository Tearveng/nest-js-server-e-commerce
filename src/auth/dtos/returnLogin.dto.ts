import { ReturnUserDto } from "src/user/dtos/returnUser.dto";

export class ReturnLoginDto {
    user: ReturnUserDto;
    refreshToken: string;
    accessToken: string;
}