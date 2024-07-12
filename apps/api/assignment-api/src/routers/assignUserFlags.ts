import {
  assignUserFlagIdSchema,
  insertAssignUserFlagParams,
  updateAssignUserFlagParams,
} from "@soco/assignment-db/schema/assignUserFlags";

import {
  createAssignUserFlag,
  deleteAssignUserFlag,
  updateAssignUserFlag,
} from "../api/assignUserFlags/mutations";
import {
  getAssignUserFlagById,
  getAssignUserFlags,
} from "../api/assignUserFlags/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const assignUserFlagsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getAssignUserFlags: publicProcedure.query(async () => {
      return getAssignUserFlags();
    }),
    getAssignUserFlagById: publicProcedure
      .input(assignUserFlagIdSchema)
      .query(async ({ input }) => {
        return getAssignUserFlagById(input.id);
      }),
    createAssignUserFlag: publicProcedure
      .input(insertAssignUserFlagParams)
      .mutation(async ({ input }) => {
        return createAssignUserFlag(input);
      }),
    updateAssignUserFlag: publicProcedure
      .input(updateAssignUserFlagParams)
      .mutation(async ({ input }) => {
        return updateAssignUserFlag(input.id, input);
      }),
    deleteAssignUserFlag: publicProcedure
      .input(assignUserFlagIdSchema)
      .mutation(async ({ input }) => {
        return deleteAssignUserFlag(input.id);
      }),
  });
