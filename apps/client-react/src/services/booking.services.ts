import { MethodHttpEnum } from "../enum/enum";
import { UseRequestApi } from "../request/commons/useApiRequest";
import { GET_BOOKINGS_BOOK_ROUTE } from "../request/route-http/route-http";
import { GetBookingsBookResponse } from "../types/booking/booking.types";


export const getBookingsBook = async (id: string): Promise<GetBookingsBookResponse[]> => {
  return await UseRequestApi<GetBookingsBookResponse[], { id: string }>({
    path: `${GET_BOOKINGS_BOOK_ROUTE}/${id}`,
    method: MethodHttpEnum.GET,
    params: { id },
    includeAuthorizationHeader: true,
  });
};