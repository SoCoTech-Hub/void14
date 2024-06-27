import { getWorkshopFormNumErrorMapById, getWorkshopFormNumErrorMaps } from "@/lib/api/workshopFormNumErrorMaps/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  workshopFormNumErrorMapIdSchema,
  insertWorkshopFormNumErrorMapParams,
  updateWorkshopFormNumErrorMapParams,
} from "@/lib/db/schema/workshopFormNumErrorMaps";
import { createWorkshopFormNumErrorMap, deleteWorkshopFormNumErrorMap, updateWorkshopFormNumErrorMap } from "@/lib/api/workshopFormNumErrorMaps/mutations";

export const workshopFormNumErrorMapsRouter = router({
  getWorkshopFormNumErrorMaps: publicProcedure.query(async () => {
    return getWorkshopFormNumErrorMaps();
  }),
  getWorkshopFormNumErrorMapById: publicProcedure.input(workshopFormNumErrorMapIdSchema).query(async ({ input }) => {
    return getWorkshopFormNumErrorMapById(input.id);
  }),
  createWorkshopFormNumErrorMap: publicProcedure
    .input(insertWorkshopFormNumErrorMapParams)
    .mutation(async ({ input }) => {
      return createWorkshopFormNumErrorMap(input);
    }),
  updateWorkshopFormNumErrorMap: publicProcedure
    .input(updateWorkshopFormNumErrorMapParams)
    .mutation(async ({ input }) => {
      return updateWorkshopFormNumErrorMap(input.id, input);
    }),
  deleteWorkshopFormNumErrorMap: publicProcedure
    .input(workshopFormNumErrorMapIdSchema)
    .mutation(async ({ input }) => {
      return deleteWorkshopFormNumErrorMap(input.id);
    }),
});
