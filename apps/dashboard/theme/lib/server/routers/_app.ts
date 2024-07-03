import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { themesRouter } from "./themes";
import { themeComponentsRouter } from "./themeComponents";
import { themeComponentStylesRouter } from "./themeComponentStyles";

export const appRouter = router({
  computers: computersRouter,
  themes: themesRouter,
  themeComponents: themeComponentsRouter,
  themeComponentStyles: themeComponentStylesRouter,
});

export type AppRouter = typeof appRouter;
