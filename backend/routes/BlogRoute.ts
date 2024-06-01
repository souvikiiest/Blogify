import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { auth } from "../middlewares/Auth";

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRoute.use("/*", auth);

blogRoute.get("/myblogs", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const response = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json(response);
  } catch (err) {
    return c.text("Error fetching posrts", 500);
  }
});

blogRoute.post("/add", async (c) => {
  const userId: string = await c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const res = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    if (res) return c.json(res);
  } catch (err) {
    return c.text("Some error occured " + err);
  }
});
blogRoute.delete("/delete/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId: string = await c.get("userId");
  const id = c.req.param("id");
  //to confirm whether id and authorId are same
  try {
    const response = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (userId !== response?.authorId)
      return c.text("You are not authorized", 500);
    else {
      const response = await prisma.post.delete({
        where: {
          id: id,
        },
      });
      if (response) return c.json({ msg: "Blog deleted successfully" });
    }
  } catch (err) {
    return c.json({ msg: "Some error occured" }, 500);
  }
});

blogRoute.put("/edit/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId: string = await c.get("userId");
  const id = c.req.param("id");
  //to confirm whether id and authorId are same
  try {
    const response = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (userId !== response?.authorId)
      return c.text("You are not authorized", 500);
    else {
      const body = await c.req.json();
      const res = await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          title: body.title,
          content: body.content,
        },
      });
      if (res)
        return c.json({
          mgs: "Blog with id " + body.id + " updated successfully",
        });
    }
  } catch (err) {
    return c.text("Check your id again. " + err);
  }
});
blogRoute.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const res = await prisma.post.findMany();
  return c.json(res);
});

blogRoute.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const postres = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!postres) return c.text("No post with given id found", 401);
    const authorRes = await prisma.user.findUnique({
      where: {
        id: postres?.authorId,
      },
    });
    return c.json({
      title: postres?.title,
      content: postres?.content,
      published: postres?.published,
      author: authorRes?.name,
    });
  } catch (err) {
    return c.text("some error occured " + err);
  }
});
