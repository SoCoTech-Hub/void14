import { createTRPCRouter } from "./trpc";

import { gradesRouter } from './routers/grades';
import { schoolsRouter } from './routers/schools';
import { userGradesRouter } from './routers/userGrades';
import { userSchoolsRouter } from './routers/userSchools';

export const appRouter = createTRPCRouter({
  grades: gradesRouter,
  schools: schoolsRouter,
  userGrades: userGradesRouter,
  userSchools: userSchoolsRouter,
});

export type AppRouter = typeof appRouter;
