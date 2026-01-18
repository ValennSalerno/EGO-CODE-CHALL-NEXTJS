import { z } from "zod";

export const modelSchema = z.object({
  id: z.number(),
  name: z.string(),
  segment: z.string(),
  year: z.number(),
  price: z.number(),
  thumbnail: z.string().url(),
  photo: z.string().url()
});

export const modelFeatureSchema = z.object({
  name: z.string(),
  description: z.string(),
  photo: z.string().url()
});

export const modelHighlightSchema = z.object({
  title: z.string(),
  content: z.string(),
  image: z.string().url()
});

export const modelDetailSchema = modelSchema.extend({
  model_features: z.array(modelFeatureSchema),
  model_highlights: z.array(modelHighlightSchema)
});

export const modelsArraySchema = z.array(modelSchema);
