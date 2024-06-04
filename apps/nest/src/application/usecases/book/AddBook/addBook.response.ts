export class AddBookResponse {
  id?: number;
  name: string;
  description: string;
  author: string;
  releaseAt: Date;
  coverImage: string;
  userId?: number;
  created_at?: Date;
  update_at?: Date;
}
