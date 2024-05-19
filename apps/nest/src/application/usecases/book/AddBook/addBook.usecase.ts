import { Book } from 'src/domaine/entities/Book.entity';
import { BookRepository } from 'src/domaine/repositories/book.repository';
import { AddBookRequest } from './addBook.request';
import { AddBookResponse } from './addBook.response';

export class AddBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(request: AddBookRequest): Promise<AddBookResponse> {
    try {
      const book = new Book(
        request.id,
        request.name,
        request.description,
        request.author,
        request.releaseAt,
        request.imageUrl,
        request.userId,
      );
      return await this.bookRepository.addBook(book);
    } catch (error) {
      throw new Error(error);
    }
  }
}
