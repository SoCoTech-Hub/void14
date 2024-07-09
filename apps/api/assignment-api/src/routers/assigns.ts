import {
  assignIdSchema,
  insertAssignParams,
  updateAssignParams,
} from "@soco/assignment-db/schema/assigns";

import {
  createAssign,
  deleteAssign,
  updateAssign,
} from "../api/assigns/mutations";
import { getAssignById, getAssigns } from "../api/assigns/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const assignsRouter = createTRPCRouter({
  getAssigns: publicProcedure.query(async () => {
    return getAssigns();
  }),
  getAssignById: publicProcedure
    .input(assignIdSchema)
    .query(async ({ input }) => {
      return getAssignById(input.id);
    }),
  createAssign: publicProcedure
    .input(insertAssignParams)
    .mutation(async ({ input }) => {
      return createAssign(input);
    }),
  updateAssign: publicProcedure
    .input(updateAssignParams)
    .mutation(async ({ input }) => {
      return updateAssign(input.id, input);
    }),
  deleteAssign: publicProcedure
    .input(assignIdSchema)
    .mutation(async ({ input }) => {
      return deleteAssign(input.id);
    }),
});
