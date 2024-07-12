import { assignFeedbackCommentsRouter } from "./routers/assignFeedbackComments";
import { assignFeedbackEditpdfAnnotsRouter } from "./routers/assignFeedbackEditpdfAnnots";
import { assignFeedbackEditpdfCmntsRouter } from "./routers/assignFeedbackEditpdfCmnts";
import { assignFeedbackEditpdfQueuesRouter } from "./routers/assignFeedbackEditpdfQueues";
import { assignFeedbackEditpdfQuicksRouter } from "./routers/assignFeedbackEditpdfQuicks";
import { assignFeedbackEditpdfRotsRouter } from "./routers/assignFeedbackEditpdfRots";
import { assignFeedbackFilesRouter } from "./routers/assignFeedbackFiles";
import { assignGradesRouter } from "./routers/assignGrades";
import { assignmentsRouter } from "./routers/assignments";
import { assignmentSubmissionsRouter } from "./routers/assignmentSubmissions";
import { assignmentUpgradesRouter } from "./routers/assignmentUpgrades";
import { assignOverridesRouter } from "./routers/assignOverrides";
import { assignPluginConfigsRouter } from "./routers/assignPluginConfigs";
import { assignsRouter } from "./routers/assigns";
import { assignSubmissionFilesRouter } from "./routers/assignSubmissionFiles";
import { assignSubmissionOnlineTextsRouter } from "./routers/assignSubmissionOnlineTexts";
import { assignSubmissionsRouter } from "./routers/assignSubmissions";
import { assignUserFlagsRouter } from "./routers/assignUserFlags";
import { assignUserMappingsRouter } from "./routers/assignUserMappings";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  assignFeedbackComments: assignFeedbackCommentsRouter,
  assignFeedbackEditpdfAnnots: assignFeedbackEditpdfAnnotsRouter,
  assignFeedbackEditpdfCmnts: assignFeedbackEditpdfCmntsRouter,
  assignFeedbackEditpdfQueues: assignFeedbackEditpdfQueuesRouter,
  assignFeedbackEditpdfQuicks: assignFeedbackEditpdfQuicksRouter,
  assignFeedbackEditpdfRots: assignFeedbackEditpdfRotsRouter,
  assignFeedbackFiles: assignFeedbackFilesRouter,
  assignGrades: assignGradesRouter,
  assignments: assignmentsRouter,
  assignmentSubmissions: assignmentSubmissionsRouter,
  assignmentUpgrades: assignmentUpgradesRouter,
  assignOverrides: assignOverridesRouter,
  assignPluginConfigs: assignPluginConfigsRouter,
  assigns: assignsRouter,
  assignSubmissionFiles: assignSubmissionFilesRouter,
  assignSubmissionOnlineTexts: assignSubmissionOnlineTextsRouter,
  assignSubmissions: assignSubmissionsRouter,
  assignUserFlags: assignUserFlagsRouter,
  assignUserMappings: assignUserMappingsRouter,
});

export type AppRouter = typeof appRouter;
