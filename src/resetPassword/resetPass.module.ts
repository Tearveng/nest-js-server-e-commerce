import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailService } from "src/mail/mail.service";
import { UserModule } from "src/user/user.module";
import { ResetPassEntity } from "./entities/resetPass.entity";
import { ResetPassController } from "./resetPass.controller";
import { ResetPassSerive } from "./resetPass.service";

@Module({
    imports: [UserModule,TypeOrmModule.forFeature([ResetPassEntity])],
    providers: [ResetPassSerive, MailService, ConfigService],
    controllers: [ResetPassController]
})

export class ResetPassModule {}