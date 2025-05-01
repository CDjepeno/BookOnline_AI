export type GetBookResponse = {
  id?: number,
  title: string,
  description: string,
  author: string,
  releaseAt: Date,
  coverUrl: string,
  userId: number,
  created_at?: Date,
  update_at?: Date
}
