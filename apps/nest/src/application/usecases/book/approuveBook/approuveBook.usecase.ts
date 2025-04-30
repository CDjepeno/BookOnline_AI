import { HttpException } from '@nestjs/common';
import { InternalServerException, NotFoundException } from 'src/domaine/errors/onlineBook.error';
import { ErrorsMessagesEnum } from 'src/enums/errors.enums';
import { BookRepository } from 'src/repositories/book.repository';
import { ApprouveBookResponse } from './approuveBook.response';
import NodemailerClient from 'src/infras/clients/nodemailer/nodemailer.client';
import { UsersRepository } from 'src/repositories/user.repository';

export class ApprouveBookUseCase {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly nodemailerClient: NodemailerClient,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(id: number): Promise<ApprouveBookResponse> {
    try {
      const book = await this.bookRepository.approuveBook(id);
      
      const user = await this.usersRepository.getUserById(book.userId)

      await this.nodemailerClient.sendMail({
        to: user.email,
        subject: `Validation Livre`,
        text: `Bonne nouvelle ! Votre livre a été approuvé par notre équipe de validation et est désormais disponible sur notre plateforme.\n  
        Nous vous remercions pour votre contribution et espérons que votre ouvrage rencontrera un beau succès auprès de nos lecteurs.\n

       N’hésitez pas à revenir vers nous si vous avez la moindre question ou besoin d’assistance.\n\n

       Bien cordialement,`,
      });

      return { msg: 'Votre livre a bien été approuvé' };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === ErrorsMessagesEnum.DATABASE_ERROR) {
          throw new InternalServerException('Database Error');
        }
        if (error.message === ErrorsMessagesEnum.NOT_FOUND) {
          throw new NotFoundException('Livre non trouvé');
        }
        if (error.message === ErrorsMessagesEnum.INTERNAL_SERVER_ERROR) {
          throw new InternalServerException(
            "Probleme serveur impossible d'ajouter l'utilisateur",
          );
        }
        throw error;
      }
      if (error instanceof HttpException) {
        throw error;
      }
      throw error;
    }
  }
}
