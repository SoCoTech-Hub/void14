import {
  insertMnetServiceParams,
  mnetServiceIdSchema,
  updateMnetServiceParams,
} from "@soco/mnet-db/schema/mnetServices";

import {
  createMnetService,
  deleteMnetService,
  updateMnetService,
} from "../api/mnetServices/mutations";
import {
  getMnetServiceById,
  getMnetServices,
} from "../api/mnetServices/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const mnetServicesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getMnetServices: publicProcedure.query(async () => {
      return getMnetServices();
    }),
    getMnetServiceById: publicProcedure
      .input(mnetServiceIdSchema)
      .query(async ({ input }) => {
        return getMnetServiceById(input.id);
      }),
    createMnetService: publicProcedure
      .input(insertMnetServiceParams)
      .mutation(async ({ input }) => {
        return createMnetService(input);
      }),
    updateMnetService: publicProcedure
      .input(updateMnetServiceParams)
      .mutation(async ({ input }) => {
        return updateMnetService(input.id, input);
      }),
    deleteMnetService: publicProcedure
      .input(mnetServiceIdSchema)
      .mutation(async ({ input }) => {
        return deleteMnetService(input.id);
      }),
  });
