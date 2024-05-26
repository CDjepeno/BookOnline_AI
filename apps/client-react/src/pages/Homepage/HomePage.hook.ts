import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../../services/book-services";
import { BookQueriesKeysEnum } from "../../enum/enum";

export default function HomePageHook() {
  const {
    isPending,
    data: books,
    error,
  } = useQuery({
    queryKey: [BookQueriesKeysEnum.GetBooks],
    queryFn: getBooks,
  });


  return { isPending, books, error };
}
