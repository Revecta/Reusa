import { z } from 'zod';

export const boxDimensionsSchema = z.object({
  width: z.number().min(1, 'Width must be greater than 0').max(200, 'Width must be less than 200cm'),
  height: z.number().min(1, 'Height must be greater than 0').max(200, 'Height must be less than 200cm'),
  depth: z.number().min(1, 'Depth must be greater than 0').max(200, 'Depth must be less than 200cm'),
});

export type BoxDimensionsFormData = z.infer<typeof boxDimensionsSchema>;