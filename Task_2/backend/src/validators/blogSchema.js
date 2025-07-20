const { z } = require('zod');

const blogSchema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .trim()
        .nonempty({ message: "Name is required" }),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .nonempty({ message: "Email is required" }),

    category: z
        .string({ required_error: "Category is required" })
        .trim()
        .nonempty({ message: "Category is required" }),
    // rating:z.array(), 
    // comments:z.array(), 
    title: z
        .string({ required_error: "Title is required" })
        .trim()
        .min(2, { message: "Title must be at least 2 characters" })
        .max(100, { message: "Title must be less than 100 characters" }),

    description: z
        .string({ required_error: "Description is required" })
        .trim()
        .nonempty({ message: "Description is required" }),

    image: z
        .string({ required_error: "Image is required" })
        .trim()
        .nonempty({ message: "Image is required" }),

    authorImage: z
        .string()
        .url({ message: "Author Image is required" })
        .trim(),

    tags: z
        .array(z.string(), { required_error: "Tags are required" })
        .nonempty({ message: "Please add at least one tag" }),

    postedOn: z
        .date()
        .optional()
        .default(() => new Date())
});

module.exports = blogSchema;
