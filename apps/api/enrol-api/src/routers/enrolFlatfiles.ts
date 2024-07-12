import {
  enrolFlatfileIdSchema,
  insertEnrolFlatfileParams,
  updateEnrolFlatfileParams,
} from "@soco/enrol-db/schema/enrolFlatfiles";

import {
  createEnrolFlatfile,
  deleteEnrolFlatfile,
  updateEnrolFlatfile,
} from "../api/enrolFlatfiles/mutations";
import {
  getEnrolFlatfileById,
  getEnrolFlatfiles,
} from "../api/enrolFlatfiles/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const enrolFlatfilesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getEnrolFlatfiles: publicProcedure.query(async () => {
      return getEnrolFlatfiles();
    }),
    getEnrolFlatfileById: publicProcedure
      .input(enrolFlatfileIdSchema)
      .query(async ({ input }) => {
        return getEnrolFlatfileById(input.id);
      }),
    createEnrolFlatfile: publicProcedure
      .input(insertEnrolFlatfileParams)
      .mutation(async ({ input }) => {
        return createEnrolFlatfile(input);
      }),
    updateEnrolFlatfile: publicProcedure
      .input(updateEnrolFlatfileParams)
      .mutation(async ({ input }) => {
        return updateEnrolFlatfile(input.id, input);
      }),
    deleteEnrolFlatfile: publicProcedure
      .input(enrolFlatfileIdSchema)
      .mutation(async ({ input }) => {
        return deleteEnrolFlatfile(input.id);
      }),
  });
