export class BookError extends Error {
  statusCode: number;
  message: string = 'unexpected error' as string;

  constructor({
    statusCode,
    message,
  }: {
    statusCode?: number;
    message: string;
  }) {
    super(message);

    this.message = message;

    if (statusCode) {
      this.statusCode = statusCode;
    }
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  getMessage(): string {
    return this.message;
  }
}
