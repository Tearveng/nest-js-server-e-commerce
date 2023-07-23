import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';

@Controller('mailing')
@ApiTags('mailer')
export class MailController {
  constructor(private readonly mailingService: MailService) {}
  // @Get('send-mail')
  // public sendMail() {
  //   this.mailingService.sendMail('yyy');
  // }
}
