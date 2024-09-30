import { z } from "zod";

export const postValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().max(100),
    description: z.string().trim(),
    images: z.array(z.string()).optional(),
    likes: z.array(z.string()).optional(),
    comments: z.array(z.string()).optional(),
    rating: z.number().optional(),
    upVotes: z.number().optional(),
    downVotes: z.number().optional(),
    user: z.string(),
    isPremium: z.boolean().optional(),
    status: z.enum(["pending", "posted", "rejected"]),
  }),
});
