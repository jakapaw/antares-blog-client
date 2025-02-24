export class UnauthorizedError extends Error {
  constructor(fn: string, msg: string, cause?: unknown, stack?: string) {
    super();
    this.message = `[ERROR] ${fn}: ${msg}`;
    this.cause = cause;
    this.stack = stack;
  }
}

export class EmptyResponse extends Error {
  constructor(fn: string, msg: string, cause?: unknown, stack?: string) {
    super();
    this.message = `[ERROR] ${fn}: ${msg}`;
    this.cause = cause;
    this.stack = stack;
  }
}