import { getAssignUserFlagById, getAssignUserFlags } from "@/lib/api/assignUserFlags/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignUserFlagIdSchema,
  insertAssignUserFlagParams,
  updateAssignUserFlagParams,
} from "@/lib/db/schema/assignUserFlags";
import { createAssignUserFlag, deleteAssignUserFlag, updateAssignUserFlag } from "@/lib/api/assignUserFlags/mutations";

export const assignUserFlagsRouter = router({
  getAssignUserFlags: publicProcedure.query(async () => {
    return getAssignUserFlags();
  }),
  getAssignUserFlagById: publicProcedure.input(assignUserFlagIdSchema).query(async ({ input }) => {
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
