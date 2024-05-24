import { QueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { BookI } from "../../interfaces";
import { getBooks } from "../../services/book-services";
import { BookQueriesKeys } from "../../request/keys/clientQueriesKey";

export default function HomePageHook() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [books, setBooks] = useState<BookI[] | undefined>(undefined);
  const queryClient = useMemo(() => new QueryClient(), []);

  useEffect(() => {
    async function loadBooks() {
      const booksData = await queryClient.fetchQuery({
        queryKey: [BookQueriesKeys.GetBooks],
        queryFn: getBooks,
      });
      console.log(booksData);
      
      setBooks(booksData);
      setIsLoading(false)
      return booksData;
    }
    loadBooks();
  }, [queryClient]);
  return { isLoading, books };
}
