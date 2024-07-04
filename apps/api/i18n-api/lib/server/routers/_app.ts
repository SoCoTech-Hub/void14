import { router } from "../server/trpc";
import { computersRouter } from "./computers";
import { localizationFieldsRouter } from "./localizationFields";
import { localizationLanguagesRouter } from "./localizationLanguages";
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
