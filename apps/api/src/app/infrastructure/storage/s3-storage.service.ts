import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { S3_CLIENT_CONFIG } from './s3-client.config';

@Injectable()
export class S3StorageService {
  private readonly client = new S3Client(S3_CLIENT_CONFIG);

  public async uploadObject(): Promise<void> {
    return;
  }

  public async deleteObject(): Promise<void> {
    return;
  }

  public async getObject(): Promise<void> {
    return;
  }
}
