import { router } from "../server/trpc";
import { computersRouter } from "./computers";
import { themeComponentsRouter } from "./themeComponents";
import { themeComponentStylesRouter } from "./themeComponentStyles";
import { themesRouter } from "./themes";

export const appRouter = router({
  computers: computersRouter,
  themes: themesRouter,
  themeComponents: themeComponentsRouter,
  themeComponentStyles: themeComponentStylesRouter,
});

export type AppRouter = typeof appRouter;
