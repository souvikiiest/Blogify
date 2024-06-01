import { Context } from "hono";
import { verify } from "hono/jwt";

const auth = async (c: Context, next: () => Promise<void>) => {
  const authheader = c.req.header("authorization");

  if (!authheader) return c.text("Authorization headeris missing", 400);
  const parts = authheader.split(" ");
  if (parts[0] != "Bearer" || parts.length !== 2)
    return c.text("Toeken must start with bearer");
  const token = parts[1];
  if (!token) return c.text("A token must be sent");
  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) return c.json({ msg: "Unauthorized " });
    c.set("userId", payload.id);
    await next();
  } catch (err) {
    return c.json({ error: err });
  }
};
export { auth };
