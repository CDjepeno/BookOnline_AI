export class Book {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly description: string,
    readonly author: string,
    readonly releaseAt: Date,
    readonly  coverImage: string,
    readonly userId: number,
  ) {}
}
