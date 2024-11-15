import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingBookRequest } from 'src/application/usecases/booking/bookingBook/bookingBook.request';
import { BookingBookResponse } from 'src/application/usecases/booking/bookingBook/bookingBook.response';
import { BookingRepository } from 'src/domaine/repositories/bookingBook.repository';
import { Between, Repository } from 'typeorm';
import { Booking } from '../models/booking.model';
import { GetBookingsBookResponse } from 'src/application/usecases/booking/getBookings/getBookingsBook.response';

export class BookingRepositoryTypeorm implements BookingRepository {
  constructor(
    @InjectRepository(Booking)
    private readonly repository: Repository<Booking>,
  ) {}

  async Order(bookReserved: BookingBookRequest): Promise<BookingBookResponse> {
    try {
      const newBooking = new Booking();
      newBooking.createdAt = bookReserved.createdAt;
      newBooking.startAt = bookReserved.startAt;
      newBooking.endAt = bookReserved.endAt;
      newBooking.userId = bookReserved.userId;
      newBooking.bookId = bookReserved.bookId;

      const result = await this.repository.save(newBooking);

      return {bookId: result.bookId};
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre :", error);
      throw new InternalServerErrorException(
        'Impossible de reserver le livre.',
      );
    }
  }

  async isBookReserved(
    bookId: number,
    startAt: Date,
    endAt: Date,
  ): Promise<boolean> {
    const existingBooking = await this.repository.findOne({
      where: [
        { bookId, startAt: Between(startAt, endAt) },
        { bookId, endAt: Between(startAt, endAt) },
      ],
    });

    return !!existingBooking; // Retourne true si une réservation existe, sinon false
  }

  async getBookingsDatesByBookId(bookId: number): Promise<GetBookingsBookResponse[]> {
    return this.repository.find({
      where: { bookId },
      select: ['startAt', 'endAt'],
    });
  }

}


