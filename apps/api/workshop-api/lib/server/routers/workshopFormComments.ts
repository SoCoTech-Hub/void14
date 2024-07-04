import {
  createWorkshopFormComment,
  deleteWorkshopFormComment,
  updateWorkshopFormComment,
} from "../api/workshopFormComments/mutations";
import {
  getWorkshopFormCommentById,
  getWorkshopFormComments,
} from "../api/workshopFormComments/queries";
import {
  insertWorkshopFormCommentParams,
  updateWorkshopFormCommentParams,
  workshopFormCommentIdSchema,
} from "../db/schema/workshopFormComments";
import { publicProcedure, router } from "../server/trpc";

export const workshopFormCommentsRouter = router({
  getWorkshopFormComments: publicProcedure.query(async () => {
    return getWorkshopFormComments();
  }),
  getWorkshopFormCommentById: publicProcedure
    .input(workshopFormCommentIdSchema)
    .query(async ({ input }) => {
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
