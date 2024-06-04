export interface AddBookResponse {
  id: string;
  name: string;
  description: string;
  author: string;
  releaseAt: Date;
  imageUrl: string;
}

export interface AddBookInput {
  name: string;
  description: string;
  author: string;
  releaseAt: Date;
  imageUrl: File | null;
}
