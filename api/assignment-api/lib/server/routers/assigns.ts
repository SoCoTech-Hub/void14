import { getAssignById, getAssigns } from "@/lib/api/assigns/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignIdSchema,
  insertAssignParams,
  updateAssignParams,
} from "@/lib/db/schema/assigns";
import { createAssign, deleteAssign, updateAssign } from "@/lib/api/assigns/mutations";

export const assignsRouter = router({
  getAssigns: publicProcedure.query(async () => {
    return getAssigns();
  }),
  getAssignById: publicProcedure.input(assignIdSchema).query(async ({ input }) => {
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
