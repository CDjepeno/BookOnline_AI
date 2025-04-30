export type BookResponse = {
  id?: number,
  title: string,
  description: string,
  userId: number,
  author: string,
  releaseAt: Date,
  coverUrl: string,
  created_at?: Date,
  update_at?: Date
}

export type ApprouveBookResponse = {
  msg: string,
}