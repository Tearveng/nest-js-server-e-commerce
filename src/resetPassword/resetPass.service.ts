import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ResetPassEntity } from './entities/resetPass.entity';

@Injectable()
export class ResetPassSerive {
  constructor(
    private readonly userService: UserService,
    readonly mailingService: MailService,
    @InjectRepository(ResetPassEntity)
    private readonly resetPassRepository: Repository<ResetPassEntity>,
  ) {}

  async uuidExpired(id: string) {
    const uuid = await this.findResetPassByUuid(id);
    const fiveHour = 1000 * 60 * 60 * 5 * 1000;
    if (uuid.createdAt.getTime() + fiveHour < Date.now()) {
      throw new BadRequestException('Token expired.');
    }

    return true;
  }

  async findResetPassByUuid(uuid: string): Promise<ResetPassEntity> {
    const retrieved = await this.resetPassRepository.findOne({
      where: { uuid },
      relations: ['user']
    });

    if (!retrieved) {
      throw new NotFoundException(`UUID: ${uuid} Not Found`);
    }

    return retrieved;
  }

  async deleteResetPassByUuid(uuid: string): Promise<boolean> {
    await this.resetPassRepository.delete({ uuid });

    return true;
  }

  async forgotPassword(email: string): Promise<boolean> {
    const user = await this.userService.findUserByEmail(email);
    const uuid = uuidv4();
    await this.resetPassRepository.save({
      uuid,
      user,
    });
    await this.mailingService.sendMail(uuid, [user.email]);

    return true;
  }
}
