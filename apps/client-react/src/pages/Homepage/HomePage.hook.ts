import { useQuery } from "@tanstack/react-query";
import { BookQueriesKeys } from "../../request/keys/clientQueriesKey";
import { getBooks } from "../../services/book-services";

export default function HomePageHook() {
  const {
    isPending,
    data: books,
    error,
  } = useQuery({
    queryKey: [BookQueriesKeys.GetBooks],
    queryFn: getBooks,
  });


  return { isPending, books, error };
}
