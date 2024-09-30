import { z } from "zod";

export const UserZodSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    bio: z.string().optional(),
    profilePicture: z.string().optional(),
    role: z.enum(["admin", "user"]).default("user"),
    posts: z.array(z.string()).optional(),
    likes: z.array(z.string()).optional(),
    comments: z.array(z.string()).optional(),
    ratedPosts: z.array(z.string()).optional(),
    isPremium: z.boolean().default(false),
    followers: z.array(z.string()).optional(),
    resetPasswordExpires: z.any().optional(),
    resetPasswordToken: z.string().optional(),
    premiumExpires: z.date().nullable().optional(),
  }),
});
