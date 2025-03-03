export class ErrorClass extends Error {
  readonly _isOperational: boolean;
  constructor(msg: string) {
    super(msg);
    this.name = "Custom Error";
    this._isOperational = true;
    Error.captureStackTrace(this, ErrorClass);
  }
}

