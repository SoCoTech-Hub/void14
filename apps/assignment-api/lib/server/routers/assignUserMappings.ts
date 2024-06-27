import { getAssignUserMappingById, getAssignUserMappings } from "@/lib/api/assignUserMappings/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignUserMappingIdSchema,
  insertAssignUserMappingParams,
  updateAssignUserMappingParams,
} from "@/lib/db/schema/assignUserMappings";
import { createAssignUserMapping, deleteAssignUserMapping, updateAssignUserMapping } from "@/lib/api/assignUserMappings/mutations";

export const assignUserMappingsRouter = router({
  getAssignUserMappings: publicProcedure.query(async () => {
    return getAssignUserMappings();
  }),
  getAssignUserMappingById: publicProcedure.input(assignUserMappingIdSchema).query(async ({ input }) => {
    return getAssignUserMappingById(input.id);
  }),
  createAssignUserMapping: publicProcedure
    .input(insertAssignUserMappingParams)
    .mutation(async ({ input }) => {
      return createAssignUserMapping(input);
    }),
  updateAssignUserMapping: publicProcedure
    .input(updateAssignUserMappingParams)
    .mutation(async ({ input }) => {
      return updateAssignUserMapping(input.id, input);
    }),
  deleteAssignUserMapping: publicProcedure
    .input(assignUserMappingIdSchema)
    .mutation(async ({ input }) => {
      return deleteAssignUserMapping(input.id);
    }),
});
