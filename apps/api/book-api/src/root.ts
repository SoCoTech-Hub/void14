import { accountRouter } from "./routers/account";
import { bookChaptersRouter } from "./routers/bookChapters";
import { booksRouter } from "./routers/books";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  account: accountRouter,
  bookChapters: bookChaptersRouter,
  books: booksRouter,
});

export type AppRouter = typeof appRouter;
