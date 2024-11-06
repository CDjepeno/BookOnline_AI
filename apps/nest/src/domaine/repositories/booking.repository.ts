import { BookingBookRequest } from "src/application/usecases/booking/bookingBook/bookingBook.request";
import { BookingBookResponse } from "src/application/usecases/booking/bookingBook/bookingBook.response";

export interface BookingRepository {
  Order(bookReserved: BookingBookRequest): Promise<BookingBookResponse>;
}