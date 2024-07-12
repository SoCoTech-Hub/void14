import {
  insertNextOfKinParams,
  nextOfKinIdSchema,
  updateNextOfKinParams,
} from "@soco/profile-db/schema/nextOfKins";

import {
  createNextOfKin,
  deleteNextOfKin,
  updateNextOfKin,
} from "../api/nextOfKins/mutations";
import { getNextOfKinById, getNextOfKins } from "../api/nextOfKins/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const nextOfKinsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getNextOfKins: publicProcedure.query(async () => {
      return getNextOfKins();
    }),
    getNextOfKinById: publicProcedure
      .input(nextOfKinIdSchema)
      .query(async ({ input }) => {
        return getNextOfKinById(input.id);
      }),
    createNextOfKin: publicProcedure
      .input(insertNextOfKinParams)
      .mutation(async ({ input }) => {
        return createNextOfKin(input);
      }),
    updateNextOfKin: publicProcedure
      .input(updateNextOfKinParams)
      .mutation(async ({ input }) => {
        return updateNextOfKin(input.id, input);
      }),
    deleteNextOfKin: publicProcedure
      .input(nextOfKinIdSchema)
      .mutation(async ({ input }) => {
        return deleteNextOfKin(input.id);
      }),
  });
