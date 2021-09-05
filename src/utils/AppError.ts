export default class AppError extends Error {
  public name: string;
  private status: number;
  private details: any;
  private errorCode: any;
  private messages: any;
  private isOperational: any;

  constructor({ status, errorCode, message, details }: any = {}) {
    super(message);

    this.name = this.errorCode || this.name;
    this.status = status || 400;
    this.details = details;
    this.errorCode = errorCode || 'AppError';
    this.message = message;
    this.isOperational = true;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);
  }
}
