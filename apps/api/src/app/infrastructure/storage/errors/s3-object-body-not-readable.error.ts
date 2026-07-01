import { S3StorageError } from './s3-storage.error';

export class S3ObjectBodyNotReadableError extends S3StorageError {
  public readonly objectKey: string;

  public constructor(objectKey: string, options?: ErrorOptions) {
    super('S3 object body is not a readable stream', options);
    this.objectKey = objectKey;
  }
}
