import {
  insertMnetHost2serviceParams,
  mnetHost2serviceIdSchema,
  updateMnetHost2serviceParams,
} from "@soco/mnet-db/schema/mnetHost2services";

import {
  createMnetHost2service,
  deleteMnetHost2service,
  updateMnetHost2service,
} from "../api/mnetHost2services/mutations";
import {
  getMnetHost2serviceById,
  getMnetHost2services,
} from "../api/mnetHost2services/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const mnetHost2servicesRouter = createTRPCRouter({
  getMnetHost2services: publicProcedure.query(async () => {
    return getMnetHost2services();
  }),
  getMnetHost2serviceById: publicProcedure
    .input(mnetHost2serviceIdSchema)
    .query(async ({ input }) => {
      return getMnetHost2serviceById(input.id);
    }),
  createMnetHost2service: publicProcedure
    .input(insertMnetHost2serviceParams)
    .mutation(async ({ input }) => {
      return createMnetHost2service(input);
    }),
  updateMnetHost2service: publicProcedure
    .input(updateMnetHost2serviceParams)
    .mutation(async ({ input }) => {
      return updateMnetHost2service(input.id, input);
    }),
  deleteMnetHost2service: publicProcedure
    .input(mnetHost2serviceIdSchema)
    .mutation(async ({ input }) => {
      return deleteMnetHost2service(input.id);
    }),
});
