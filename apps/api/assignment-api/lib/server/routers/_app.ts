import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { assignsRouter } from "./assigns";
import { assignmentsRouter } from "./assignments";
import { assignGradesRouter } from "./assignGrades";
import { assignOverridesRouter } from "./assignOverrides";
import { assignPluginConfigsRouter } from "./assignPluginConfigs";
import { assignSubmissionsRouter } from "./assignSubmissions";
import { assignUserFlagsRouter } from "./assignUserFlags";
import { assignUserMappingsRouter } from "./assignUserMappings";
import { assignFeedbackCommentsRouter } from "./assignFeedbackComments";
import { assignFeedbackEditpdfAnnotsRouter } from "./assignFeedbackEditpdfAnnots";
import { assignFeedbackEditpdfCmntsRouter } from "./assignFeedbackEditpdfCmnts";
import { assignFeedbackEditpdfQueuesRouter } from "./assignFeedbackEditpdfQueues";
import { assignFeedbackEditpdfQuicksRouter } from "./assignFeedbackEditpdfQuicks";
import { assignFeedbackEditpdfRotsRouter } from "./assignFeedbackEditpdfRots";
import { assignFeedbackFilesRouter } from "./assignFeedbackFiles";
import { assignmentSubmissionsRouter } from "./assignmentSubmissions";
import { assignmentUpgradesRouter } from "./assignmentUpgrades";
import { assignSubmissionFilesRouter } from "./assignSubmissionFiles";
import { assignSubmissionOnlineTextsRouter } from "./assignSubmissionOnlineTexts";

export const appRouter = router({
  computers: computersRouter,
  assigns: assignsRouter,
  assignments: assignmentsRouter,
  assignGrades: assignGradesRouter,
  assignOverrides: assignOverridesRouter,
  assignPluginConfigs: assignPluginConfigsRouter,
  assignSubmissions: assignSubmissionsRouter,
  assignUserFlags: assignUserFlagsRouter,
  assignUserMappings: assignUserMappingsRouter,
  assignFeedbackComments: assignFeedbackCommentsRouter,
  assignFeedbackEditpdfAnnots: assignFeedbackEditpdfAnnotsRouter,
  assignFeedbackEditpdfCmnts: assignFeedbackEditpdfCmntsRouter,
  assignFeedbackEditpdfQueues: assignFeedbackEditpdfQueuesRouter,
  assignFeedbackEditpdfQuicks: assignFeedbackEditpdfQuicksRouter,
  assignFeedbackEditpdfRots: assignFeedbackEditpdfRotsRouter,
  assignFeedbackFiles: assignFeedbackFilesRouter,
  assignmentSubmissions: assignmentSubmissionsRouter,
  assignmentUpgrades: assignmentUpgradesRouter,
  assignSubmissionFiles: assignSubmissionFilesRouter,
  assignSubmissionOnlineTexts: assignSubmissionOnlineTextsRouter,
});

export type AppRouter = typeof appRouter;
