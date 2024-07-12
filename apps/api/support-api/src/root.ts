import { supportCommentsRouter } from "./routers/supportComments";
import { supportDepartmentsRouter } from "./routers/supportDepartments";
import { supportStatusesRouter } from "./routers/supportStatuses";
import { supportTicketsRouter } from "./routers/supportTickets";
import { supportTopicsRouter } from "./routers/supportTopics";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  supportComments: supportCommentsRouter,
  supportDepartments: supportDepartmentsRouter,
  supportStatuses: supportStatusesRouter,
  supportTickets: supportTicketsRouter,
  supportTopics: supportTopicsRouter,
});

export type AppRouter = typeof appRouter;
