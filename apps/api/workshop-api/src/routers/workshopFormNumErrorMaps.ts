import {
  insertWorkshopFormNumErrorMapParams,
  updateWorkshopFormNumErrorMapParams,
  workshopFormNumErrorMapIdSchema,
} from "@soco/workshop-db/schema/workshopFormNumErrorMaps";

import {
  createWorkshopFormNumErrorMap,
  deleteWorkshopFormNumErrorMap,
  updateWorkshopFormNumErrorMap,
} from "../api/workshopFormNumErrorMaps/mutations";
import {
  getWorkshopFormNumErrorMapById,
  getWorkshopFormNumErrorMaps,
} from "../api/workshopFormNumErrorMaps/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const workshopFormNumErrorMapsRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
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
