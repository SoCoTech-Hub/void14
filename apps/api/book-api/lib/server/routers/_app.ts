import { router } from "../server/trpc";
import { bookChaptersRouter } from "./bookChapters";
import { booksRouter } from "./books";
import { computersRouter } from "./computers";

export const appRouter = router({
  computers: computersRouter,
  books: booksRouter,
  bookChapters: bookChaptersRouter,
});

export type AppRouter = typeof appRouter;
