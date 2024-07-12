import { quizaccessSebQuizSettingsRouter } from "./routers/quizaccessSebQuizSettings";
import { quizaccessSebTemplatesRouter } from "./routers/quizaccessSebTemplates";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  quizaccessSebQuizSettings: quizaccessSebQuizSettingsRouter,
  quizaccessSebTemplates: quizaccessSebTemplatesRouter,
});

export type AppRouter = typeof appRouter;
