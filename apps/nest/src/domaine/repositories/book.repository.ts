import { AddBookResponse } from 'src/application/usecases/book/addBook/addBook.response';
import { GetAllBookResponse } from 'src/application/usecases/book/getAllBook/getAllBook.response';
import { GetBookResponse } from 'src/application/usecases/book/getBookById/getBook.response';
import { BookEntity } from '../entities/Book.entity';

export interface BookRepository {
  addBook(book: BookEntity): Promise<AddBookResponse>;
  getAllBook(): Promise<GetAllBookResponse[]>;
  getBook(id: number): Promise<GetBookResponse>;
}
