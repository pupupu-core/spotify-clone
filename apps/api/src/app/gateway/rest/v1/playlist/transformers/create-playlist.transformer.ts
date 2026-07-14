import type { TransformFnParams } from 'class-transformer';

export const trimPlaylistTextField = (params: TransformFnParams): unknown => {
  const value: unknown = params.value;

  return typeof value === 'string' ? value.trim() : value;
};
