import { z } from "zod";

export const postValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().max(100),
    description: z.string().trim(),
    image: z.string().optional(),
    comments: z
      .array(
        z.object({
          userId: z.string(),
          userName: z.string(),
          userImage: z.string().optional(),
          content: z.string(),
        })
      )
      .optional(),
    rating: z.number().optional(),
    upVotes: z.array(z.string()).optional(),
    tags: z
      .array(
        z.enum([
          "breakfast",
          "lunch",
          "dinner",
          "dessert",
          "snack",
          "vegan",
          "vegetarian",
          "gluten-free",
          "low-carb",
        ])
      )
      .max(5, "Tags exceeds the limit of 5"),
    cookingTime: z.number(),
    ingredients: z.array(
      z.object({
        name: z.string(),
        quantity: z.string(),
      })
    ),
    downVotes: z.array(z.string()).optional(),
    user: z.string(),
    isPremium: z.boolean().optional(),
    status: z.enum(["pending", "posted", "rejected"]),
  }),
});
