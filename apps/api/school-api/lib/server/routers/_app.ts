import { router } from "../server/trpc";
import { gradesRouter } from "./grades";
import { schoolsRouter } from "./schools";
import { userGradesRouter } from "./userGrades";
import { userSchoolsRouter } from "./userSchools";

export const appRouter = router({
  grades: gradesRouter,
  schools: schoolsRouter,
  userSchools: userSchoolsRouter,
  userGrades: userGradesRouter,
});

export type AppRouter = typeof appRouter;
