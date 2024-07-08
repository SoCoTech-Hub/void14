import { createTRPCRouter } from "./trpc";

import { quizaccessSebQuizSettingsRouter } from './routers/quizaccessSebQuizSettings';
import { quizaccessSebTemplatesRouter } from './routers/quizaccessSebTemplates';

export const appRouter = createTRPCRouter({
  quizaccessSebQuizSettings: quizaccessSebQuizSettingsRouter,
  quizaccessSebTemplates: quizaccessSebTemplatesRouter,
});

export type AppRouter = typeof appRouter;
