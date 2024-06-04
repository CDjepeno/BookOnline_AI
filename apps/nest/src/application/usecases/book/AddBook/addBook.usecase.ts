import { Book } from 'src/domaine/entities/Book.entity';
import { badrequestexception } from 'src/domaine/errors/book.error';
import { BookRepository } from 'src/domaine/repositories/book.repository';
import { AwsS3Client } from 'src/infras/clients/aws/aws-s3.client';
import { AddBookRequest } from './addBook.request';
import { AddBookResponse } from './addBook.response';

export class AddBookUseCase {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly awsS3Client: AwsS3Client,
  ) {}

  async execute(
    request: AddBookRequest,
    file: Express.Multer.File,
  ): Promise<AddBookResponse> {
    try {
      if (!file) {
        throw new badrequestexception('File est requis');
      }

      if (!this.awsS3Client) {
        throw new Error('awsS3Client is not defined');
      }

      const imageUrl = await this.awsS3Client.uploadFile(file);

      const book = new Book(
        request.id,
        request.name,
        request.description,
        request.author,
        request.releaseAt,
        imageUrl,
        request.userId,
      );
      const res = await this.bookRepository.addBook(book);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
}
