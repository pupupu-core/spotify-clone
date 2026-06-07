import { z } from 'zod';

const JamendoResponseStatusSchema = z.enum(['success', 'failed']);

const JamendoResponseHeadersSchema = z.object({
  status: JamendoResponseStatusSchema,
  code: z.number(),
  error_message: z.string(),
  warnings: z.string(),
  results_count: z.number().optional(),
  results_fullcount: z.number().optional(),
});

export const createJamendoResponseSchema = <TItemSchema extends z.ZodType>(
  itemSchema: TItemSchema,
) =>
  z.object({
    headers: JamendoResponseHeadersSchema,
    results: z.array(itemSchema),
  });

export type JamendoResponseStatusDto = z.infer<typeof JamendoResponseStatusSchema>;
export type JamendoResponseHeadersDto = z.infer<typeof JamendoResponseHeadersSchema>;
