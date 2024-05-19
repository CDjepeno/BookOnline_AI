export class AddBookResponse {
  id?: number;
  name: string;
  description: string;
  author: string;
  releaseAt: Date;
  imageUrl: string;
  approved: number;
  userId?: number;
  created_at?: Date;
  update_at?: Date;
}
