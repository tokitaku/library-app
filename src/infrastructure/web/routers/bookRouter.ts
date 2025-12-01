import { BookController } from "@/adapter/controllers/bookController";
import { Book } from "@prisma/client";
import { Router } from "express";

export function bookRoutes(bookController: BookController): Router {
  const router = Router();

  router.post("/", bookController.addBook.bind(bookController));
  router.get("/:id", bookController.findBookById.bind(bookController));

  return router;
}
