import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserControllerModule } from './controllers/user/users.controller.module';
import { UsecaseProxyModule } from './infras/usecase-proxy/usecase-proxy.module';
import { UsersController } from './controllers/user/users.controller';
import { User } from './infras/entities/user.entity';
import { TwilioModule } from 'nestjs-twilio';

@Module({
  imports: [
    UsecaseProxyModule.register(),
    UserControllerModule,
    ConfigModule.forRoot(),

    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        accountSid: configService.get<string>('TWILIO_ACCOUNT_SID'),
        authToken: configService.get('TWILIO_AUTH_TOKEN'),
        serviceSid: configService.get('TWILIO_SENDER_PHONE_NUMBER'),
      }),
      inject: [ConfigService],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
