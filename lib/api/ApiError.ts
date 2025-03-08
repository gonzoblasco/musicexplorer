// src/lib/api/ApiError.ts
export class ApiError extends Error {
  status: number;
  cause?: Error;

  constructor(message: string, status: number, cause?: Error) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.cause = cause;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
