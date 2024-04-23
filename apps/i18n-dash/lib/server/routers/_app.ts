import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { localizationLanguagesRouter } from "./localizationLanguages";
import { localizationFieldsRouter } from "./localizationFields";
import { localizationTranslationsRouter } from "./localizationTranslations";
import { localizationUsersRouter } from "./localizationUsers";

export const appRouter = router({
  computers: computersRouter,
  localizationLanguages: localizationLanguagesRouter,
  localizationFields: localizationFieldsRouter,
  localizationTranslations: localizationTranslationsRouter,
  localizationUsers: localizationUsersRouter,
});

export type AppRouter = typeof appRouter;
