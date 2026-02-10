import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigTypeOrmModule } from './infras/clients/typeorm/typeorm.module';
import { ControllerModule } from './infras/controllers/controller.module';
import { RegisterController } from './infras/controllers/user/register/register.controller';
import { UsecaseProxyModule } from './infras/usecase-proxy/usecase-proxy.module';
// import { ConfigKafkaModule } from './infras/clients/kafka/kafka.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodemailerModules } from './infras/clients/nodemailer/nodemailer.module';
import { RedisModules } from './infras/clients/redis/redis.module';
import { SocketModules } from './infras/clients/socket/socket.module';
import { Book } from './infras/models/book.model';
import { Booking } from './infras/models/booking.model';
import { Contact } from './infras/models/contact.model';
import { User } from './infras/models/user.model';
import { RepositoriesModule } from './infras/services/repositories.module';
import { UserRepositoryTypeorm } from './infras/services/user.repository.typeorm';
// import { ConfigKafkaModule } from './infras/clients/kafka/kafka.module';
import { AddBookUseCase } from './application/usecases/book/addBook/addBook.usecase';
import { BookingBookUseCase } from './application/usecases/booking/bookingBook/bookingBook.usecase';
import { AddUserUseCase } from './application/usecases/user/adduser/add.user.usecase';
import { GoogleStrategy } from './infras/clients/googleOAuth/google.strategy';
import { FixtureModule } from './infras/fixtures/fixtures.module';
import { FixtureService } from './infras/fixtures/fixtures.service';

@Module({
  imports: [
    UsecaseProxyModule.register(),
    ControllerModule,
    ConfigTypeOrmModule,
    RedisModules,
    NodemailerModules,
    // ConfigKafkaModule,
    SocketModules,
    ConfigModule.forRoot({
      isGlobal: true, // Rendre ConfigService accessible partout dans l'application
      envFilePath: '.env', // Assurez-vous d'utiliser le bon fichier .env si ce n'est pas le fichier par défaut
    }),
    RepositoriesModule,
    TypeOrmModule.forFeature([User, Book, Booking, Contact]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    FixtureModule,
  ],
  controllers: [RegisterController],
  providers: [
    UserRepositoryTypeorm,
    AddUserUseCase,
    AddBookUseCase,
    BookingBookUseCase,
    GoogleStrategy,
  ],
  exports: [AddUserUseCase, AddBookUseCase, BookingBookUseCase],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly fixtureService: FixtureService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
      const isDev = this.configService.get('NODE_ENV', 'development') === 'development';

    if (isDev) {
      console.log('🌱 Chargement automatique des fixtures au démarrage...');
      try {
        await this.fixtureService.loadFixtures();
      } catch (error) {
        console.error('❌ Erreur lors du chargement des fixtures:', error);
      }
    } else {
      console.log(
        'ℹ️  Chargement des fixtures désactivé (LOAD_FIXTURES=false)',
      );
    }
  }
}
