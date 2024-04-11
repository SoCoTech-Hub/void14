import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { supportStatusesRouter } from "./supportStatuses";
import { supportDepartmentsRouter } from "./supportDepartments";
import { supportTopicsRouter } from "./supportTopics";
import { supportTicketsRouter } from "./supportTickets";
import { supportCommentsRouter } from "./supportComments";

export const appRouter = router({
  computers: computersRouter,
  supportStatuses: supportStatusesRouter,
  supportDepartments: supportDepartmentsRouter,
  supportTopics: supportTopicsRouter,
  supportTickets: supportTicketsRouter,
  supportComments: supportCommentsRouter,
});

export type AppRouter = typeof appRouter;
