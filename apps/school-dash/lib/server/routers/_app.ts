import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { gradesRouter } from "./grades";
import { schoolsRouter } from "./schools";
import { userSchoolsRouter } from "./userSchools";
import { userGradesRouter } from "./userGrades";

export const appRouter = router({
  computers: computersRouter,
  grades: gradesRouter,
  schools: schoolsRouter,
  userSchools: userSchoolsRouter,
  userGrades: userGradesRouter,
});

export type AppRouter = typeof appRouter;
