export class EmailAlreadyTakenError extends Error {
  public constructor() {
    super('Email already taken');
    this.name = 'EmailAlreadyTakenError';
  }
}
