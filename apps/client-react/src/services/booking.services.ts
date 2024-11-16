import { MethodHttpEnum } from "../enum/enum";
import { UseRequestApi } from "../request/commons/useApiRequest";
import { BOOKING_BOOK_ROUTE, GET_BOOKINGS_BOOK_ROUTE } from "../request/route-http/route-http";
import { BookingBookResponse, GetBookingsBookResponse } from "../types/booking/booking.types";
import { BookingBookFormInput } from "../types/user/form.types";


export const getBookingsBook = async (id: string): Promise<GetBookingsBookResponse[]> => {
  return await UseRequestApi<GetBookingsBookResponse[], { id: string }>({
    path: `${GET_BOOKINGS_BOOK_ROUTE}/${id}`,
    method: MethodHttpEnum.GET,
    params: { id },
    includeAuthorizationHeader: true,
  });
};

export const BookingBook = async (data: BookingBookFormInput): Promise<BookingBookResponse> => {
  return await UseRequestApi<BookingBookResponse, BookingBookFormInput>({
    path: BOOKING_BOOK_ROUTE,
    method: MethodHttpEnum.POST,
    params: data,
    includeAuthorizationHeader: true,
  });
};