export class AddBookRequest {
  id?: number;
  name: string;
  description: string;
  author: string;
  releaseAt: Date;
  coverFile: Express.Multer.File;
  userId: number;
}
