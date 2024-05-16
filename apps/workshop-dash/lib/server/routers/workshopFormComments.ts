import { getWorkshopFormCommentById, getWorkshopFormComments } from "@/lib/api/workshopFormComments/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  workshopFormCommentIdSchema,
  insertWorkshopFormCommentParams,
  updateWorkshopFormCommentParams,
} from "@/lib/db/schema/workshopFormComments";
import { createWorkshopFormComment, deleteWorkshopFormComment, updateWorkshopFormComment } from "@/lib/api/workshopFormComments/mutations";

export const workshopFormCommentsRouter = router({
  getWorkshopFormComments: publicProcedure.query(async () => {
    return getWorkshopFormComments();
  }),
  getWorkshopFormCommentById: publicProcedure.input(workshopFormCommentIdSchema).query(async ({ input }) => {
    return getWorkshopFormCommentById(input.id);
  }),
  createWorkshopFormComment: publicProcedure
    .input(insertWorkshopFormCommentParams)
    .mutation(async ({ input }) => {
      return createWorkshopFormComment(input);
    }),
  updateWorkshopFormComment: publicProcedure
    .input(updateWorkshopFormCommentParams)
    .mutation(async ({ input }) => {
      return updateWorkshopFormComment(input.id, input);
    }),
  deleteWorkshopFormComment: publicProcedure
    .input(workshopFormCommentIdSchema)
    .mutation(async ({ input }) => {
      return deleteWorkshopFormComment(input.id);
    }),
});
