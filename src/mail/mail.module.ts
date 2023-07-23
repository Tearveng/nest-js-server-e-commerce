import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailController } from "./mail.controller";
import { MailService } from "./mail.service";

@Module({
    providers: [ConfigService, MailService],
    controllers: [MailController]
})

export class MailModule {}