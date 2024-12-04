import { useQuery } from "@tanstack/react-query";
import { BookQueriesKeysEnum } from "../../enum/enum";
import { getBooks } from "../../services/book.services";
import { useForm } from "react-hook-form";
import { GetBookByNameInput } from "../../types/book/book.types";

export default function HomePageHook(page: number, limit: number) {
  const {
    isPending,
    data: booksPagination,
    error,
  } = useQuery({
    queryKey: [BookQueriesKeysEnum.GetBooks, page, limit],
    queryFn: () => getBooks(page, limit),
  });

  const {
    control,
    formState: { errors },
  } = useForm<GetBookByNameInput>();

  const totalPages = booksPagination?.meta.totalPages  
  const books = booksPagination?.books  
  

  return { isPending, books, error, control, errors, totalPages };
}
