const { z } = require('zod');

const blogSchema = z.object({    
    name:z.string().trim() , 
    email:z.string().trim() , 
    category:z.string().trim() , 
    // rating:z.array(), 
    // comments:z.array(), 
    title: z
        .string()
        .min(2, { message: "Title is required" })
        .max(100, { message: "Title must be less than 100 characters" })
        .trim(),

    story: z
        .string()
        .min(2, { message: "Story is required" })
        .max(1000, { message: "Story must be less than 1000 characters" })
        .trim(),

    description: z
        .string()
        .min(100, { message: "Description is required" })
        .max(4000, { message: "Description must be less than 4000 characters" })
        .trim(),

    image: z
        .string()
        .url({ message: "Image required" })
        .trim(),

    authorImage: z
        .string()
        .url({ message: "Author Image required" })
        .trim(),

    tags: z
        .array(z.string().min(2, { message: "Each tag must be a valid string" }))
        .min(1, { message: "At least one tag is required" }),

    postedOn: z
        .date()
        .optional()
        .default(() => new Date())
});

module.exports = blogSchema;
