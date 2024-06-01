import z from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createBlog = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlog = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});

export type signupSchema = z.infer<typeof signupSchema>;
export type signinSchema = z.infer<typeof signinSchema>;
export type createBlog = z.infer<typeof createBlog>;
export type updateBlog = z.infer<typeof updateBlog>;
