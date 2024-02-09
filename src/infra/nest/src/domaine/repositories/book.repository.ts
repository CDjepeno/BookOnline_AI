import { CreateBookDto } from '../model/book/book.dtos';
import { BookModel } from '../model/book/book.model';

export interface BookRepository {
  createBook(book: CreateBookDto): Promise<BookModel>;
}
