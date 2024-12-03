import { useQuery } from "@tanstack/react-query";
import { BookQueriesKeysEnum } from "../../enum/enum";
import { getBooks } from "../../services/book.services";
import { useForm } from "react-hook-form";
import { GetBookByNameInput } from "../../types/book/book.types";

export default function HomePageHook() {
  const {
    isPending,
    data: books,
    error,
  } = useQuery({
    queryKey: [BookQueriesKeysEnum.GetBooks],
    queryFn: getBooks,
  });

  const {
    control,
    formState: { errors },
  } = useForm<GetBookByNameInput>();

  

  return { isPending, books, error, control, errors };
}
