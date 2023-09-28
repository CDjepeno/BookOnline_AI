import { BookError } from './error';

class BadRequest extends BookError {
  constructor(message: string) {
    super({ statusCode: 403, message });
  }
}

class Unauthorized extends BookError {
  constructor(message: string) {
    super({ statusCode: 401, message });
  }
}

class NotFound extends BookError {
  constructor(message: string) {
    super({ statusCode: 404, message });
  }
}

class InternalServerError extends BookError {
  constructor(message: string) {
    super({ statusCode: 500, message });
  }
}

class PasswordError extends BookError {
  constructor(message: string) {
    super({ statusCode: 401, message });
  }
}

class MissingCredentialError extends BookError {
  constructor(message: string) {
    super({ statusCode: 400, message });
  }
}

export {
  BadRequest,
  Unauthorized,
  NotFound,
  InternalServerError,
  PasswordError,
  MissingCredentialError,
};
