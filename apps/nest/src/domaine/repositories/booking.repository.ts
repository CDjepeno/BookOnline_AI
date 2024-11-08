import { BookingBookRequest } from "src/application/usecases/booking/bookingBook/bookingBook.request";
import { BookingBookResponse } from "src/application/usecases/booking/bookingBook/bookingBook.response";

export interface BookingRepository {
  isBookReserved(bookId: number, startAt: Date, endAt: Date): unknown;
  Order(bookReserved: BookingBookRequest): Promise<BookingBookResponse>;
}