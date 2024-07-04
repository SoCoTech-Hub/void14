import {
  createWorkshopFormNumErrorMap,
  deleteWorkshopFormNumErrorMap,
  updateWorkshopFormNumErrorMap,
} from "../api/workshopFormNumErrorMaps/mutations";
import {
  getWorkshopFormNumErrorMapById,
  getWorkshopFormNumErrorMaps,
} from "../api/workshopFormNumErrorMaps/queries";
import {
  insertWorkshopFormNumErrorMapParams,
  updateWorkshopFormNumErrorMapParams,
  workshopFormNumErrorMapIdSchema,
} from "../db/schema/workshopFormNumErrorMaps";
import { publicProcedure, router } from "../server/trpc";

export const workshopFormNumErrorMapsRouter = router({
  getWorkshopFormNumErrorMaps: publicProcedure.query(async () => {
    return getWorkshopFormNumErrorMaps();
  }),
  getWorkshopFormNumErrorMapById: publicProcedure
    .input(workshopFormNumErrorMapIdSchema)
    .query(async ({ input }) => {
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
