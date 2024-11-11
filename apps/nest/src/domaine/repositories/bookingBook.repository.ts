import { BookingBookRequest } from "src/application/usecases/booking/bookingBook/bookingBook.request";
import { BookingBookResponse } from "src/application/usecases/booking/bookingBook/bookingBook.response";
import { GetBookingsBookResponse } from "src/application/usecases/booking/getBookings/getBookingsBook.response";

export interface BookingRepository {
  isBookReserved(bookId: number, startAt: Date, endAt: Date): Promise<boolean>;
  getBookingsDatesByBookId(bookId: number): Promise<GetBookingsBookResponse[]>;
  Order(bookReserved: BookingBookRequest): Promise<BookingBookResponse>;
}