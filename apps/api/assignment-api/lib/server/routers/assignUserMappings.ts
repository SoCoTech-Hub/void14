import {
  createAssignUserMapping,
  deleteAssignUserMapping,
  updateAssignUserMapping,
} from "../api/assignUserMappings/mutations";
import {
  getAssignUserMappingById,
  getAssignUserMappings,
} from "../api/assignUserMappings/queries";
import {
  assignUserMappingIdSchema,
  insertAssignUserMappingParams,
  updateAssignUserMappingParams,
} from "../db/schema/assignUserMappings";
import { publicProcedure, router } from "../server/trpc";

export const assignUserMappingsRouter = router({
  getAssignUserMappings: publicProcedure.query(async () => {
    return getAssignUserMappings();
  }),
  getAssignUserMappingById: publicProcedure
    .input(assignUserMappingIdSchema)
    .query(async ({ input }) => {
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
