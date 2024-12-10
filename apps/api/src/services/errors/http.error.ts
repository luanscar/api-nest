class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string = '⚠️ Erro HTTP genérico') {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.message = message;
    Object.setPrototypeOf(this, HttpError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
