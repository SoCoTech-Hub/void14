import { quizaccessSebQuizSettingsRouter } from "./routers/quizaccessSebQuizSettings";
import { quizaccessSebTemplatesRouter } from "./routers/quizaccessSebTemplates";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  quizaccessSebQuizSettings: quizaccessSebQuizSettingsRouter,
  quizaccessSebTemplates: quizaccessSebTemplatesRouter,
});

export type AppRouter = typeof appRouter;
