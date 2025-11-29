import { BookController } from "@/presentation/bookController.js";
import express from "express";

const app = express();
app.use(express.json());

const bookController = new BookController();

const PORT = process.env.PORT || 3000;

app.post("/books", bookController.addBook.bind(bookController));
app.get("/books/:id", bookController.findBookById.bind(bookController));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
