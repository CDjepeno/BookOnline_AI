import { BookingEntity } from "src/domaine/entities/Booking.entity";
import { BookingBookRequest } from "./bookingBook.request";
import { BookingBookResponse } from "./bookingBook.response";
import { BookingRepository } from "src/domaine/repositories/booking.repository";

export class BookingBookUseCase {
  constructor(
    private readonly bookingRepository: BookingRepository,
  ) {}

  async execute(request: BookingBookRequest): Promise<BookingBookResponse> {
    try {

      const book = new BookingEntity(
        request.bookId,
        request.createdAt,
        request.startAt,
        request.endAt,
        request.userId,
        request.id,
      );
      const res = await this.bookingRepository.Order(book);

      return res;
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre :", error);
      throw new Error(error);
    }
  }
}