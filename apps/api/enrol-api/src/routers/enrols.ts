import {
  enrolIdSchema,
  insertEnrolParams,
  updateEnrolParams,
} from "@soco/enrol-db/schema/enrols";

import { createEnrol, deleteEnrol, updateEnrol } from "../api/enrols/mutations";
import { getEnrolById, getEnrols } from "../api/enrols/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const enrolsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getEnrols: publicProcedure.query(async () => {
      return getEnrols();
    }),
    getEnrolById: publicProcedure
      .input(enrolIdSchema)
      .query(async ({ input }) => {
        return getEnrolById(input.id);
      }),
    createEnrol: publicProcedure
      .input(insertEnrolParams)
      .mutation(async ({ input }) => {
        return createEnrol(input);
      }),
    updateEnrol: publicProcedure
      .input(updateEnrolParams)
      .mutation(async ({ input }) => {
        return updateEnrol(input.id, input);
      }),
    deleteEnrol: publicProcedure
      .input(enrolIdSchema)
      .mutation(async ({ input }) => {
        return deleteEnrol(input.id);
      }),
  });
