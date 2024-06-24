import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { booksRouter } from "./books";
import { bookChaptersRouter } from "./bookChapters";

export const appRouter = router({
  computers: computersRouter,
  books: booksRouter,
  bookChapters: bookChaptersRouter,
});

export type AppRouter = typeof appRouter;
