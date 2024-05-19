import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddBookRequest } from 'src/application/usecases/book/AddBook/add.book.request';
import { AddBookResponse } from 'src/application/usecases/book/AddBook/add.book.response';
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
      book.imageUrl = addBookRequest.imageUrl;
      book.approved = 0;
      book.userId = addBookRequest.userId;

      return this.repository.save(book);
    } catch (error) {
      console.log("Erreur lors de l'ajout du livre :", error);
      throw new error("Impossible d'ajouter le livre.");
    }
  }
}
