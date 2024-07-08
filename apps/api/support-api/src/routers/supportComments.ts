import { getSupportCommentById, getSupportComments } from "../api/supportComments/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  supportCommentIdSchema,
  insertSupportCommentParams,
  updateSupportCommentParams,
} from "@soco/support-db/schema/supportComments";
import { createSupportComment, deleteSupportComment, updateSupportComment } from "../api/supportComments/mutations";

export const supportCommentsRouter =createTRPCRouter({
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
