import { router } from "../server/trpc";
import { quizaccessSebQuizSettingsRouter } from "./quizaccessSebQuizSettings";
import { quizaccessSebTemplatesRouter } from "./quizaccessSebTemplates";

export const appRouter = router({
  quizaccessSebTemplates: quizaccessSebTemplatesRouter,
  quizaccessSebQuizSettings: quizaccessSebQuizSettingsRouter,
});

export type AppRouter = typeof appRouter;
