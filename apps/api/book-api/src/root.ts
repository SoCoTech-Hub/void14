import { createTRPCRouter } from "./trpc";

import { accountRouter } from './routers/account';
import { bookChaptersRouter } from './routers/bookChapters';
import { booksRouter } from './routers/books';

export const appRouter = createTRPCRouter({
  account: accountRouter,
  bookChapters: bookChaptersRouter,
  books: booksRouter,
});

export type AppRouter = typeof appRouter;
