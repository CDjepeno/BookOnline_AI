import { CreateBookDto } from 'src/domaine/model/book/book.dtos';
import { BookModel } from 'src/domaine/model/book/book.model';
import { BookRepository } from 'src/domaine/repositories/book.repository';

export class CreateBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(request: CreateBookDto): Promise<BookModel> {
    try {
      return await this.bookRepository.createBook(request);
    } catch (error) {
      throw error;
    }
  }
}
