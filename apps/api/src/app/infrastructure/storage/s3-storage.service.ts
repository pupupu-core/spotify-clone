import { Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { createHash, randomUUID } from 'node:crypto';
import { Readable } from 'node:stream';
import { extname } from 'node:path';
import { APP_CONFIG } from '$/shared/config/app.config';
import { S3_STORAGE_CONFIG } from './s3-storage.config';
import { RetrieveObjectResult, UploadObjectInput, UploadObjectResult } from './types';

@Injectable()
export class S3StorageService {
  private readonly storageClient = new S3Client(S3_STORAGE_CONFIG);

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

    await this.storageClient.send(
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
    await this.storageClient.send(
      new DeleteObjectCommand({
        Bucket: APP_CONFIG.storage.s3.bucket,
        Key: objectKey,
      }),
    );
  }

  public async retrieveObject(objectKey: string): Promise<RetrieveObjectResult> {
    const response = await this.storageClient.send(
      new GetObjectCommand({
        Bucket: APP_CONFIG.storage.s3.bucket,
        Key: objectKey,
      }),
    );

    if (!(response.Body instanceof Readable)) {
      throw new Error('Expected S3 object body to be a Node readable stream');
    }

    return {
      body: response.Body,
      contentType: response.ContentType,
      contentLength: response.ContentLength,
    };
  }
}
