import { Book } from 'src/domaine/entities/Book';
import { BookRepository } from 'src/domaine/repositories/book.repository';
import { AddBookRequest } from './add.book.request';
import { AddBookResponse } from './add.book.response';

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
      console.log(book);
      return await this.bookRepository.addBook(book);
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre :", error);
      throw new Error("Impossible d'ajouter le livre.");
    }
  }
}
