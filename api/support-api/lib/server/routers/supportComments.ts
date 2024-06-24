import { getSupportCommentById, getSupportComments } from "@/lib/api/supportComments/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  supportCommentIdSchema,
  insertSupportCommentParams,
  updateSupportCommentParams,
} from "@/lib/db/schema/supportComments";
import { createSupportComment, deleteSupportComment, updateSupportComment } from "@/lib/api/supportComments/mutations";

export const supportCommentsRouter = router({
  getSupportComments: publicProcedure.query(async () => {
    return getSupportComments();
  }),
  getSupportCommentById: publicProcedure.input(supportCommentIdSchema).query(async ({ input }) => {
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
