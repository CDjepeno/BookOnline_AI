import { AddBookRequest } from 'src/application/usecases/book/AddBook/add.book.request';
import { AddBookResponse } from 'src/application/usecases/book/AddBook/add.book.response';
import { BookRepository } from 'src/domaine/repositories/book.repository';
import { Repository } from 'typeorm';
import { Book } from '../models/book.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class BookRepositoryTyperom implements BookRepository {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
  ) {}

  async addBook(addBookRequest: AddBookRequest): Promise<AddBookResponse> {
    const book = new Book();
    book.name = addBookRequest.name;
    book.description = addBookRequest.description;
    book.author = addBookRequest.author;

    return this.repository.save(book);
  }
}
