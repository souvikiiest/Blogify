import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinSchema, signupSchema } from "@souvikg734/medium-common";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRoute.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signupSchema.safeParse(body);
  if (!success) {
    return c.json({ msg: "Please enter valid input" }, 401);
  }
  try {
    const resp = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    return c.json({
      msg: "Your account craeted successfully with userid: " + resp.id,
    });
  } catch (err) {
    return c.text("Email already exist or some error occured");
  }
});

userRoute.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signinSchema.safeParse(body);
  if (!success) {
    return c.json({ msg: "Please enter valid input" }, 401);
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) return c.json({ msg: "User not found" });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt: token, name: user.name, id: user.id });
  } catch (err) {
    return c.json({ msg: err });
  }
});
userRoute.get("/getalldatails", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const users = await prisma.user.findMany();
  return c.json(users);
});
userRoute.get("/getauthor/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  const users = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return c.json(users);
});
userRoute.post("/deleteall", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const res2 = await prisma.post.deleteMany();
    const res1 = await prisma.user.deleteMany();

    console.log("All deleted");
  } catch (e) {
    console.log("some erro occured", e);
  }
});
