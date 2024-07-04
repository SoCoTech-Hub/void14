import { router } from "../server/trpc";
import { assignFeedbackCommentsRouter } from "./assignFeedbackComments";
import { assignFeedbackEditpdfAnnotsRouter } from "./assignFeedbackEditpdfAnnots";
import { assignFeedbackEditpdfCmntsRouter } from "./assignFeedbackEditpdfCmnts";
import { assignFeedbackEditpdfQueuesRouter } from "./assignFeedbackEditpdfQueues";
import { assignFeedbackEditpdfQuicksRouter } from "./assignFeedbackEditpdfQuicks";
import { assignFeedbackEditpdfRotsRouter } from "./assignFeedbackEditpdfRots";
import { assignFeedbackFilesRouter } from "./assignFeedbackFiles";
import { assignGradesRouter } from "./assignGrades";
import { assignmentsRouter } from "./assignments";
import { assignmentSubmissionsRouter } from "./assignmentSubmissions";
import { assignmentUpgradesRouter } from "./assignmentUpgrades";
import { assignOverridesRouter } from "./assignOverrides";
import { assignPluginConfigsRouter } from "./assignPluginConfigs";
import { assignsRouter } from "./assigns";
import { assignSubmissionFilesRouter } from "./assignSubmissionFiles";
import { assignSubmissionOnlineTextsRouter } from "./assignSubmissionOnlineTexts";
import { assignSubmissionsRouter } from "./assignSubmissions";
import { assignUserFlagsRouter } from "./assignUserFlags";
import { assignUserMappingsRouter } from "./assignUserMappings";
import { computersRouter } from "./computers";

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
