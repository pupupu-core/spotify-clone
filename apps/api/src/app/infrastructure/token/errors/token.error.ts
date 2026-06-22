export class TokenError extends Error {
  public readonly code: string;

  constructor({ message, code }: { message: string; code: string }) {
    super(message);
    this.name = new.target.name;
    this.code = code;
  }
}
