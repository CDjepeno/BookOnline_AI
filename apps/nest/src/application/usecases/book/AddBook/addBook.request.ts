export class AddBookRequest {
  id?: number;
  name: string;
  description: string;
  author: string;
  releaseAt: Date;
  coverImage: string;
  userId: number;
}
