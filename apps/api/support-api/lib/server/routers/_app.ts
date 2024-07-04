import { router } from "../server/trpc";
import { supportCommentsRouter } from "./supportComments";
import { supportDepartmentsRouter } from "./supportDepartments";
import { supportStatusesRouter } from "./supportStatuses";
import { supportTicketsRouter } from "./supportTickets";
import { supportTopicsRouter } from "./supportTopics";

export const appRouter = router({
  supportComments: supportCommentsRouter,
  supportDepartments: supportDepartmentsRouter,
  supportStatuses: supportStatusesRouter,
  supportTickets: supportTicketsRouter,
  supportTopics: supportTopicsRouter,
});

export type AppRouter = typeof appRouter;
