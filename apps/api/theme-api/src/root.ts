import { themeComponentsRouter } from './routers/themeComponents';
import { themeComponentStylesRouter } from './routers/themeComponentStyles';
import { themesRouter } from './routers/themes';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  themeComponents: themeComponentsRouter,
  themeComponentStyles: themeComponentStylesRouter,
  themes: themesRouter,
});

export type AppRouter = typeof appRouter;
