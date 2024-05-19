import { AddBookResponse } from 'src/application/usecases/book/AddBook/addBook.response';
import { GetAllBookResponse } from 'src/application/usecases/book/GetAllBook/getAllBook.response';
import { Book } from '../entities/Book.entity';

export interface BookRepository {
  addBook(book: Book): Promise<AddBookResponse>;
  getAllBook(): Promise<GetAllBookResponse[]>;
}
