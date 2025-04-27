import { HttpException } from '@nestjs/common';
import { BookEntity } from 'src/domaine/entities/Book.entity';
import { InternalServerException, NotFoundException } from 'src/domaine/errors/onlineBook.error';
import { ErrorsMessagesEnum } from 'src/enums/errors.enums';
import { AwsS3Client } from 'src/infras/clients/aws/aws-s3.client';
import { BookRepository } from 'src/repositories/book.repository';
import { AddBookRequest } from './addBook.request';
import { AddBookResponse } from './addBook.response';
import NodemailerClient from 'src/infras/clients/nodemailer/nodemailer.client';
import { UsersRepository } from 'src/repositories/user.repository';

export class AddBookUseCase {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly awsS3Client: AwsS3Client,
    private nodemailerClient: NodemailerClient,
    private usersRepository: UsersRepository,
  ) {}

  async execute(request: AddBookRequest): Promise<AddBookResponse> {
    try {
      const coverUrl = await this.awsS3Client.uploadFile(request.coverUrl);

      const book = new BookEntity(
        request.id!,
        request.title,
        request.description,
        request.author,
        request.releaseAt,
        coverUrl,
        request.userId,
        false
      );
      await this.bookRepository.addBook(book);

      const user = await this.usersRepository.getUserById(request.id!)

      await this.nodemailerClient.sendMail({
        to: user.email,
        subject: `Attente de validation`,
        text: `Nous vous informons que votre livre est actuellement en cours de validation par notre administrateur.\n  
        Une fois cette étape terminée, vous recevrez une notification vous indiquant si votre publication a été approuvée ou s’il est nécessaire d’apporter des modifications.\n

       Nous vous remercions pour votre contribution et restons à votre disposition si vous avez la moindre question.\n\n

       Bien cordialement,`,
      });

      return { msg: 'Votre livre a bien été créé' };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === ErrorsMessagesEnum.DATABASE_ERROR) {
          throw new InternalServerException('Database Error');
        }
        if (error.message === ErrorsMessagesEnum.NOT_FOUND) {
          throw new NotFoundException('Utilisateur non trouvé');
        }
        if (error.message === ErrorsMessagesEnum.INTERNAL_SERVER_ERROR) {
          throw new InternalServerException(
            "Probleme serveur impossible d'ajouter l'utilisateur",
          );
        }
        throw error;
      }
      if (error instanceof HttpException) {
        throw error;
      }
      throw error;
    }
  }
}
