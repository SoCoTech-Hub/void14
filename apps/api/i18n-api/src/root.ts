import { localizationFieldsRouter } from "./routers/localizationFields";
import { localizationLanguagesRouter } from "./routers/localizationLanguages";
import { localizationTranslationsRouter } from "./routers/localizationTranslations";
import { localizationUsersRouter } from "./routers/localizationUsers";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  localizationFields: localizationFieldsRouter,
  localizationLanguages: localizationLanguagesRouter,
  localizationTranslations: localizationTranslationsRouter,
  localizationUsers: localizationUsersRouter,
});

export type AppRouter = typeof appRouter;
