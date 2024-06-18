import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/todos", async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    if (!todos) {
      return res.status(404).json({
        msg: "No todos found!",
      });
    }

    res.status(200).json({
      msg: "Todos found!",
      todos,
    });
  } catch (e) {
    console.error(e);
  }
});

interface Todos {
  title: string;
  content: string;
}

router.post("/todos", async (req, res) => {
  try {
    const { title, content }: Todos = req.body;
    if (!title || !content) {
      return res.status(411).json({
        msg: "Give valid todo",
      });
    }
    const result = await prisma.todo.create({
      data: {
        title,
        content,
      },
    });

    res.status(200).json({
      msg: "Todo created successfully",
      result,
    });
  } catch (e) {
    console.error(e);
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        msg: "Todo not found!",
      });
    }

    await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      msg: "Todo deleted successfully!",
    });
  } catch (e) {
    console.error(e);
  }
});

interface UpdateParams {
  title?: string;
  content?: string;
}

router.put("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content }: UpdateParams = req.body;
    const existingTodo = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingTodo) {
      return res.status(404).json({
        msg: "Todo not found!!",
      });
    }

    await prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
      },
    });

    res.status(200).json({
      msg: "Todo updated successfully!!",
    });
  } catch (e) {
    console.error(e);
  }
});

export default router;
