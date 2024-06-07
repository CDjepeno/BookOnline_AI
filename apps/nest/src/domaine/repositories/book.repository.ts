import { AddBookResponse } from 'src/application/usecases/book/AddBook/addBook.response';
import { GetAllBookResponse } from 'src/application/usecases/book/GetAllBook/getAllBook.response';
import { BookEntity } from '../entities/Book.entity';

export interface BookRepository {
  addBook(book: BookEntity): Promise<AddBookResponse>;
  getAllBook(): Promise<GetAllBookResponse[]>;
}
