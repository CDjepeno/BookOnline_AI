import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { BookingsQueriesKeysEnum, BookQueriesKeysEnum } from "../../../enum/enum";
import { getBook } from "../../../services/book.services";
import { getBookingsBook } from "../../../services/booking.services";

function BookDetailHook() {
  const { id } = useParams<{ id: string }>();

  const {
    isPending,
    data: book,
    error,
  } = useQuery({
    queryKey: [BookQueriesKeysEnum.Book],
    queryFn: () => getBook(id!),
    enabled: !!id,
  });

  const {
    data: bookingsBook,
  } = useQuery({
    queryKey: [BookingsQueriesKeysEnum.GetBookingsBook],
    queryFn: () => getBookingsBook(id!),
    enabled: !!id,
  });

  return { isPending, bookingsBook, book, error };
}

export default BookDetailHook;
