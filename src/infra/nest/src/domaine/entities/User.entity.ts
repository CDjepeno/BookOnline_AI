export class User {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly email: string,
    readonly phone: string,
    readonly password: string,
  ) {}
}
