import { getWorkshopFormCommentById, getWorkshopFormComments } from "../api/workshopFormComments/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  workshopFormCommentIdSchema,
  insertWorkshopFormCommentParams,
  updateWorkshopFormCommentParams,
} from "@soco/workshop-db/schema/workshopFormComments";
import { createWorkshopFormComment, deleteWorkshopFormComment, updateWorkshopFormComment } from "../api/workshopFormComments/mutations";

export const workshopFormCommentsRouter =createTRPCRouter({
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
