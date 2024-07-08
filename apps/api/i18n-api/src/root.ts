import { createTRPCRouter } from "./trpc";

import { localizationFieldsRouter } from './routers/localizationFields';
import { localizationLanguagesRouter } from './routers/localizationLanguages';
import { localizationTranslationsRouter } from './routers/localizationTranslations';
import { localizationUsersRouter } from './routers/localizationUsers';

export const appRouter = createTRPCRouter({
  localizationFields: localizationFieldsRouter,
  localizationLanguages: localizationLanguagesRouter,
  localizationTranslations: localizationTranslationsRouter,
  localizationUsers: localizationUsersRouter,
});

export type AppRouter = typeof appRouter;
