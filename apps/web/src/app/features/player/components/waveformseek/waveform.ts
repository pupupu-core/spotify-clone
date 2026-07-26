const MIN_BAR_HEIGHT = 5;

interface WaveformPayload {
  peaks: unknown[];
}

export function parseWaveformPeaks(waveformData: string | null | undefined): number[] {
  const payload = parseWaveformPayload(waveformData);

  if (!payload) {
    return [];
  }

  const numericPeaks: number[] = [];
  let maximumPeak = 1;

  for (let i = 0; i < payload.peaks.length; i++) {
    const val = payload.peaks[i];

    if (typeof val === 'number' && Number.isFinite(val)) {
      const absVal = Math.abs(val);

      numericPeaks.push(absVal);
      if (absVal > maximumPeak) {
        maximumPeak = absVal;
      }
    }
  }

  if (numericPeaks.length === 0) {
    return [];
  }

  return numericPeaks.map(peak => Math.max(MIN_BAR_HEIGHT, (peak / maximumPeak) * 100));
}

export function downsampleWaveformPeaks(peaks: readonly number[], maximumBars: number): number[] {
  const barCount = Number.isFinite(maximumBars) ? Math.max(1, Math.floor(maximumBars)) : 1;

  if (peaks.length <= barCount) {
    return [...peaks];
  }

  const result = new Array<number>(barCount);
  const totalPeaks = peaks.length;

  for (let barIndex = 0; barIndex < barCount; barIndex++) {
    const start = Math.floor((barIndex * totalPeaks) / barCount);
    const end = Math.max(start + 1, Math.floor(((barIndex + 1) * totalPeaks) / barCount));

    let maxInChunk = peaks[start];

    for (let i = start + 1; i < end; i++) {
      if (peaks[i] > maxInChunk) {
        maxInChunk = peaks[i];
      }
    }
    result[barIndex] = maxInChunk;
  }

  return result;
}

function parseWaveformPayload(waveformData: string | null | undefined): WaveformPayload | null {
  const cleanData = waveformData?.trim() ?? '';

  if (cleanData.length === 0) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(cleanData.replaceAll("'", '"'));

    if (!isRecord(parsed) || !Array.isArray(parsed['peaks'])) {
      return null;
    }

    return { peaks: parsed['peaks'] };
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
