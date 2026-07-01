/**
 * Parses an HTTP Range header into an inclusive byte range.
 *
 * Supports single ranges like `bytes=0-1023`, `bytes=100-`, and `bytes=-500`.
 * Returns `undefined` when the header is missing, malformed, or outside of the
 * available resource size.
 */
export const parseHttpRangeHeader = (
  rangeHeader: string | undefined,
  totalSize: number,
):
  | {
      start: number;
      end: number;
    }
  | undefined => {
  if (rangeHeader === undefined) {
    return;
  }

  const match = rangeHeader.match(/^bytes=(\d*)-(\d*)$/);

  if (match === null) {
    return;
  }

  const [, rawStart, rawEnd] = match;

  const start = rawStart === '' ? 0 : Number(rawStart);
  const end = rawEnd === '' ? totalSize - 1 : Number(rawEnd);

  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    start < 0 ||
    end < start ||
    end >= totalSize
  ) {
    return;
  }

  return { start, end };
};
