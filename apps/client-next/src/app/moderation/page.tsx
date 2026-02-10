export const dynamic = 'force-dynamic';

import { getPendingBooks } from "@/services/book.services";
import ModerationDetail from "./moderationDetail";

export default async function Profile() {
  const limit = 6;

const pendingBooksPaginate = await getPendingBooks(1, limit);
  
  return (
    <ModerationDetail
      booksPendingPagination={pendingBooksPaginate}
      initalPage={1}
      totalPages={pendingBooksPaginate.pagination.totalPages}
    />
  );
}