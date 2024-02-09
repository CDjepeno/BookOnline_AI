import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthInput } from 'src/domaine/model/auth.input';
import { AuthResponse } from 'src/domaine/model/auth.response';
import { CurrentUserResponse } from 'src/domaine/model/current.user.response';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../domaine/model/user/user.dtos';
import { UserModel } from '../../domaine/model/user/user.model';
import { UsersRepository } from '../../domaine/repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepositoryTyperom implements UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    const user = new User();
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    user.name = createUserDto.name;
    user.phone = createUserDto.phone;
    return this.repository.save(user);
  }

  async signIn(siginIn: AuthInput): Promise<AuthResponse> {
    const { email, password } = siginIn;
    const user = await this.repository.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException("L'utilisateur n'existe pas.");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Le mot de passe est invalide.');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '60s',
    });
    return { name: user.name, email: user.email, token };
  }

  async getCurrentUser(email: string): Promise<CurrentUserResponse> {
    try {
      const userEntity = await this.repository.findOne({
        where: { email },
      });

      if (!userEntity) {
        throw new NotFoundException();
      }

      return userEntity;
    } catch (error) {
      console.error(
        "Erreur lors de la recherche de l'utilisateur :",
        error.message,
      );
      throw new Error(
        "Une erreur s'est produite lors de la recherche de l'utilisateur.",
      );
    }
  }
}
