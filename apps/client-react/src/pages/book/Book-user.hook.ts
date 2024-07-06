import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { BookQueriesKeysEnum, RouterEnum } from "../../enum/enum";
import { getBooksByUser } from "../../services/book-services";

function BookUSerHook() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  if (!userId) {
    navigate(RouterEnum.HOME);
  }

  const {
    data: books,
    isPending,
    error,
  } = useQuery({
    queryKey: [BookQueriesKeysEnum.BookUser, userId],
    queryFn: () => getBooksByUser(userId!),
    enabled: !!userId,
  });

  return { books, isPending, error };
}

export default BookUSerHook;
