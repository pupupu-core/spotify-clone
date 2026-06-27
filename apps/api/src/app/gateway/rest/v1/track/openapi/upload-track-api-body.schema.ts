export const UploadTrackApiBodyOpenApiSchema = {
  type: 'object',
  required: ['file', 'title', 'artistName'],
  properties: {
    file: {
      type: 'string',
      format: 'binary',
    },
    title: {
      type: 'string',
    },
    artistName: {
      type: 'string',
    },
    albumName: {
      type: 'string',
    },
  },
};
