import {
  InternalServerException,
  NotFoundException,
} from 'src/domaine/errors/onlineBook.error';
import { ErrorsMessagesEnum } from 'src/enums/errors.enums';
import { BookRepository } from 'src/repositories/book.repository';
import { GetPendingBooksResponsePagination } from './getPendingBooks.response';

export class GetPendingBooksUsecase {
  constructor(private readonly repository: BookRepository) {}
  async execute(
    page: number,
    limit: number,
  ): Promise<GetPendingBooksResponsePagination> {
    try {
      return await this.repository.getPendingBooks(page, limit);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === ErrorsMessagesEnum.INTERNAL_SERVER_ERROR) {
          throw new InternalServerException(
            'Probleme serveur impossible de récupérer les livres en attentes',
          );
        }
        if (error.message === ErrorsMessagesEnum.DATABASE_ERROR) {
          throw new InternalServerException('Database Error');
        }
        if (error.message === ErrorsMessagesEnum.NOT_FOUND) {
          throw new NotFoundException('Aucun livres en attente trouvé');
        }
      }
      throw error;
    }
  }
}
