import { BookRepository } from 'src/domaine/repositories/book.repository';
import { GetAllBookResponse, GetAllBookResponsePagination } from './getAllBook.response';

export class GetAllBookUsecase {
  constructor(private readonly repository: BookRepository) {}
  async execute(page: number, limit: number): Promise<GetAllBookResponsePagination> {
    try {
      return await this.repository.getAllBook(page, limit);
    } catch (error) {
      throw error;
    }
  }
}
