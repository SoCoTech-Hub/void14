import {
  insertWorkshopFormNumErrorParams,
  updateWorkshopFormNumErrorParams,
  workshopFormNumErrorIdSchema,
} from "@soco/workshop-db/schema/workshopFormNumErrors";

import {
  createWorkshopFormNumError,
  deleteWorkshopFormNumError,
  updateWorkshopFormNumError,
} from "../api/workshopFormNumErrors/mutations";
import {
  getWorkshopFormNumErrorById,
  getWorkshopFormNumErrors,
} from "../api/workshopFormNumErrors/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const workshopFormNumErrorsRouter = createTRPCRouter({
  getWorkshopFormNumErrors: publicProcedure.query(async () => {
    return getWorkshopFormNumErrors();
  }),
  getWorkshopFormNumErrorById: publicProcedure
    .input(workshopFormNumErrorIdSchema)
    .query(async ({ input }) => {
      return getWorkshopFormNumErrorById(input.id);
    }),
  createWorkshopFormNumError: publicProcedure
    .input(insertWorkshopFormNumErrorParams)
    .mutation(async ({ input }) => {
      return createWorkshopFormNumError(input);
    }),
  updateWorkshopFormNumError: publicProcedure
    .input(updateWorkshopFormNumErrorParams)
    .mutation(async ({ input }) => {
      return updateWorkshopFormNumError(input.id, input);
    }),
  deleteWorkshopFormNumError: publicProcedure
    .input(workshopFormNumErrorIdSchema)
    .mutation(async ({ input }) => {
      return deleteWorkshopFormNumError(input.id);
    }),
});
