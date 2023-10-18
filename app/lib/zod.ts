import { z } from 'zod';

export const newUserSchema = z.object({
  username: z.string(),
  name: z.string(),
  imgSrc: z.string().optional(),
});

