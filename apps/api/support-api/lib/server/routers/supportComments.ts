import {
  createSupportComment,
  deleteSupportComment,
  updateSupportComment,
} from "../api/supportComments/mutations";
import {
  getSupportCommentById,
  getSupportComments,
} from "../api/supportComments/queries";
import {
  insertSupportCommentParams,
  supportCommentIdSchema,
  updateSupportCommentParams,
} from "../db/schema/supportComments";
import { publicProcedure, router } from "../server/trpc";

export const supportCommentsRouter = router({
  getSupportComments: publicProcedure.query(async () => {
    return getSupportComments();
  }),
  getSupportCommentById: publicProcedure
    .input(supportCommentIdSchema)
    .query(async ({ input }) => {
      return getSupportCommentById(input.id);
    }),
  createSupportComment: publicProcedure
    .input(insertSupportCommentParams)
    .mutation(async ({ input }) => {
      return createSupportComment(input);
    }),
  updateSupportComment: publicProcedure
    .input(updateSupportCommentParams)
    .mutation(async ({ input }) => {
      return updateSupportComment(input.id, input);
    }),
  deleteSupportComment: publicProcedure
    .input(supportCommentIdSchema)
    .mutation(async ({ input }) => {
      return deleteSupportComment(input.id);
    }),
});
