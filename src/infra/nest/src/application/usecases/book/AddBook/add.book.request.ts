export class AddBookRequest {
  id?: number;
  name: string;
  description: string;
  author: string;
  releaseAt: Date;
  imageUrl: string;
  approved: number;
  userId: number;
}
