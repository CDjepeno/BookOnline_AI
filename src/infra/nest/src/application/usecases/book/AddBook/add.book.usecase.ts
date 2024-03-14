import { BookRepository } from 'src/domaine/repositories/book.repository';
import { AddBookRequest } from './add.book.request';
import { AddBookResponse } from './add.book.response';
import { Book } from 'src/domaine/entities/Book.entity';

export class AddBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(request: AddBookRequest): Promise<AddBookResponse> {
    try {
      const approved = request.approved || 0;
      const book = new Book(
        request.id,
        request.name,
        request.description,
        request.author,
        request.releaseAt,
        request.imageUrl,
        approved,
        request.userId,
      );
      return await this.bookRepository.addBook(book);
    } catch (error) {
      throw new Error(error);
    }
  }
}
