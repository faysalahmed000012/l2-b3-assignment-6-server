"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodSchema = void 0;
const zod_1 = require("zod");
exports.UserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
        bio: zod_1.z.string().optional(),
        profilePicture: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        role: zod_1.z.enum(["admin", "user"]).default("user"),
        posts: zod_1.z.array(zod_1.z.string()).optional(),
        likes: zod_1.z.array(zod_1.z.string()).optional(),
        comments: zod_1.z.array(zod_1.z.string()).optional(),
        ratedPosts: zod_1.z.array(zod_1.z.string()).optional(),
        isPremium: zod_1.z.boolean().default(false),
        isBlocked: zod_1.z.boolean().default(false),
        followers: zod_1.z.array(zod_1.z.string()).optional(),
        following: zod_1.z.array(zod_1.z.string()).optional(),
        resetPasswordExpires: zod_1.z.any().optional(),
        resetPasswordToken: zod_1.z.string().optional(),
        tranId: zod_1.z.string().optional(),
        premiumExpires: zod_1.z.date().nullable().optional(),
    }),
});
