import {
  digilibIdSchema,
  insertDigilibParams,
  updateDigilibParams,
} from "@soco/digilib-db/schema/digilibs";

import {
  createDigilib,
  deleteDigilib,
  updateDigilib,
} from "../api/digilibs/mutations";
import { getDigilibById, getDigilibs } from "../api/digilibs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const digilibsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getDigilibs: publicProcedure.query(async () => {
      return getDigilibs();
    }),
    getDigilibById: publicProcedure
      .input(digilibIdSchema)
      .query(async ({ input }) => {
        return getDigilibById(input.id);
      }),
    createDigilib: publicProcedure
      .input(insertDigilibParams)
      .mutation(async ({ input }) => {
        return createDigilib(input);
      }),
    updateDigilib: publicProcedure
      .input(updateDigilibParams)
      .mutation(async ({ input }) => {
        return updateDigilib(input.id, input);
      }),
    deleteDigilib: publicProcedure
      .input(digilibIdSchema)
      .mutation(async ({ input }) => {
        return deleteDigilib(input.id);
      }),
  });
