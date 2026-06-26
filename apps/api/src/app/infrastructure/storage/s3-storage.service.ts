import { Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { S3_STORAGE_CONFIG } from './s3-storage.config';
import { createHash, randomUUID } from 'node:crypto';
import { extname } from 'node:path';
import { APP_CONFIG } from '$/shared/config/app.config';
import { Readable } from 'node:stream';
import { S3ObjectBodyNotReadableError } from './errors/s3-object-body-not-readable.error';

export type UploadObjectKind = 'track-audio' | 'track-cover';

export interface UploadObjectInput {
  buffer: Buffer;
  mimeType: string;
  originalFileName: string;
  accountId: string;
  kind: UploadObjectKind;
}

export interface UploadObjectResult {
  bucket: string;
  objectKey: string;
  checksum: string;
  sizeBytes: number;
}

export interface RetrieveObjectResult {
  body: Readable;
  contentType?: string;
  contentLength?: number;
}

@Injectable()
export class S3StorageService {
  private readonly storage = new S3Client(S3_STORAGE_CONFIG);

  public async uploadObject({
    buffer,
    mimeType,
    originalFileName,
    accountId,
    kind,
  }: UploadObjectInput): Promise<UploadObjectResult> {
    const checksumSha256 = createHash('sha256').update(buffer).digest('hex');
    const extension = extname(originalFileName).toLowerCase();
    const objectKey = `${kind}/${accountId}/${randomUUID()}${extension}`;

    await this.storage.send(
      new PutObjectCommand({
        Bucket: APP_CONFIG.storage.s3.bucket,
        Key: objectKey,
        Body: buffer,
        ContentType: mimeType,
        Metadata: { checksumSha256, originalFileName },
      }),
    );

    return {
      bucket: APP_CONFIG.storage.s3.bucket,
      objectKey,
      checksum: checksumSha256,
      sizeBytes: buffer.length,
    };
  }

  public async deleteObject(objectKey: string): Promise<void> {
    await this.storage.send(
      new DeleteObjectCommand({
        Bucket: APP_CONFIG.storage.s3.bucket,
        Key: objectKey,
      }),
    );
  }

  public async retrieveObject(objectKey: string): Promise<RetrieveObjectResult> {
    const response = await this.storage.send(
      new GetObjectCommand({
        Bucket: APP_CONFIG.storage.s3.bucket,
        Key: objectKey,
      }),
    );

    const body = response.Body;

    if (!(body instanceof Readable)) {
      throw new S3ObjectBodyNotReadableError(objectKey);
    }

    return {
      body,
      contentType: response.ContentType,
      contentLength: response.ContentLength,
    };
  }
}
