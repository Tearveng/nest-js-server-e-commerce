import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { ResetPassEntity } from 'src/resetPassword/entities/resetPass.entity';
import { ResetPassSerive } from 'src/resetPassword/resetPass.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
        useFactory: () => ({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
        })
    }),
    TypeOrmModule.forFeature([ResetPassEntity])
  ],
  controllers: [AuthController, ],
  providers: [AuthService, ResetPassSerive, MailService, ConfigService],
})
export class AuthModule {}
