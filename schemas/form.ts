import * as z from 'zod';
export const schema = z.object({
  name: z.string().min(4),
  description: z.string().min(4)
});

export type schemaType = z.infer<typeof schema>;
