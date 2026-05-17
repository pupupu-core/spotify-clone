export interface JamendoHeader {
  status: 'succeed' | 'failed';
  code: number;
  error_message: string;
  warnings: string;
  results_count: number;
}
