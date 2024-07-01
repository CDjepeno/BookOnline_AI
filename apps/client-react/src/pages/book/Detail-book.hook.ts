import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { BookQueriesKeysEnum, RouterEnum } from "../../enum/enum";
import { getBook } from "../../services/book-services";

function DetailBookHook() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  if (!id) {
    navigate(RouterEnum.HOME);
  }
  console.log(id);
  const {
    isPending,
    data: book,
    error,
  } = useQuery({
    queryKey: [BookQueriesKeysEnum.Book, id],
    queryFn: () => getBook(id!),
    enabled: !!id,
  });

  return { isPending, book, error };
}

export default DetailBookHook;
