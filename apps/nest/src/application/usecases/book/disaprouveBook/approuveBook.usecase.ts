import { HttpException } from '@nestjs/common';
import { InternalServerException, NotFoundException } from 'src/domaine/errors/onlineBook.error';
import { ErrorsMessagesEnum } from 'src/enums/errors.enums';
import { BookRepository } from 'src/repositories/book.repository';
import NodemailerClient from 'src/infras/clients/nodemailer/nodemailer.client';
import { UsersRepository } from 'src/repositories/user.repository';
import { DisaprouveBookResponse } from './disaprouveBook.response';

export class DisaprouveBookUseCase {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly nodemailerClient: NodemailerClient,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(id: number): Promise<DisaprouveBookResponse> {
    try {
      const book = await this.bookRepository.getBook(id);
      
      const user = await this.usersRepository.getUserById(book.userId)

      
      await this.nodemailerClient.sendMail({
        to: user.email,
        subject: `Désapprobation Livre`,
        text: `Nous tenons à vous informer que, après un examen attentif, nous avons décidé de ne pas approuver le livre intitulé ${book.title} pour notre plateforme. En conséquence, ce livre sera supprimé de notre base de données.\n
              Cette décision a été prise conformément à nos [critères de sélection/politiques internes], et nous vous encourageons à prendre en compte ces éléments pour toute soumission future.\n
              Nous comprenons que cette nouvelle puisse être décevante et nous vous remercions pour votre compréhension. Si vous avez des questions ou souhaitez des précisions supplémentaires sur les raisons de cette désapprobation, n'hésitez pas à nous contacter.\n
              Merci pour votre contribution et votre compréhension.\n\n
              Cordialement,`,
      });

      await this.bookRepository.deleteBook(id)

      return { msg: 'Le livre a bien été désapprouvé' };
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
