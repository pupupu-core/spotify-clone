import type { Readable } from 'node:stream';

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
