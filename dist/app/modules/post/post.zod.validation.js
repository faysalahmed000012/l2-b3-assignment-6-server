"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidationSchema = void 0;
const zod_1 = require("zod");
exports.postValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().trim().max(100),
        description: zod_1.z.string().trim(),
        image: zod_1.z.string().optional(),
        comments: zod_1.z
            .array(zod_1.z.object({
            userId: zod_1.z.string(),
            userName: zod_1.z.string(),
            userImage: zod_1.z.string().optional(),
            content: zod_1.z.string(),
        }))
            .optional(),
        rating: zod_1.z.number().optional(),
        upVotes: zod_1.z.array(zod_1.z.string()).optional(),
        tags: zod_1.z
            .array(zod_1.z.enum([
            "breakfast",
            "lunch",
            "dinner",
            "dessert",
            "snack",
            "vegan",
            "vegetarian",
            "gluten-free",
            "low-carb",
        ]))
            .max(5, "Tags exceeds the limit of 5"),
        cookingTime: zod_1.z.number(),
        ingredients: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string(),
            quantity: zod_1.z.string(),
        })),
        downVotes: zod_1.z.array(zod_1.z.string()).optional(),
        user: zod_1.z.string(),
        isPremium: zod_1.z.boolean().optional(),
        status: zod_1.z.enum(["pending", "posted", "rejected"]),
    }),
});
