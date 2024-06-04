import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddBookRequest } from 'src/application/usecases/book/AddBook/addBook.request';
import { AddBookResponse } from 'src/application/usecases/book/AddBook/addBook.response';
import { GetAllBookResponse } from 'src/application/usecases/book/GetAllBook/getAllBook.response';
import { BookRepository } from 'src/domaine/repositories/book.repository';
import { Repository } from 'typeorm';
import { Book } from '../models/book.model';
import { User } from '../models/user.model';

export class BookRepositoryTyperom implements BookRepository {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addBook(addBookRequest: AddBookRequest): Promise<AddBookResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: addBookRequest.userId },
      });

      if (!user) {
        throw new NotFoundException("L'utilisateur n'existe pas.");
      }

      const book = new Book();
      book.name = addBookRequest.name;
      book.description = addBookRequest.description;
      book.author = addBookRequest.author;
      book.releaseAt = addBookRequest.releaseAt;
      book.coverImage = addBookRequest.coverImage;
      book.userId = addBookRequest.userId;

      return this.repository.save(book);
    } catch (error) {
      console.log("Erreur lors de l'ajout du livre :", error);
      throw new InternalServerErrorException("Impossible d'ajouter le livre.");
    }
  }

  async getAllBook(): Promise<GetAllBookResponse[]> {
    try {
      const books = await this.repository.find();
      return books;
    } catch (error) {
      console.error('Erreur lors de la récupération des livres :', error);
      throw new InternalServerErrorException(
        'Impossible de récupérer les livres.',
      );
    }
  }
}
