import {
  insertUniversityParams,
  universityIdSchema,
  updateUniversityParams,
} from "@soco/universities-db/schema/universities";

import {
  createUniversity,
  deleteUniversity,
  updateUniversity,
} from "../api/universities/mutations";
import {
  getUniversities,
  getUniversityById,
} from "../api/universities/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const universitiesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getUniversities: publicProcedure.query(async () => {
      return getUniversities();
    }),
    getUniversityById: publicProcedure
      .input(universityIdSchema)
      .query(async ({ input }) => {
        return getUniversityById(input.id);
      }),
    createUniversity: publicProcedure
      .input(insertUniversityParams)
      .mutation(async ({ input }) => {
        return createUniversity(input);
      }),
    updateUniversity: publicProcedure
      .input(updateUniversityParams)
      .mutation(async ({ input }) => {
        return updateUniversity(input.id, input);
      }),
    deleteUniversity: publicProcedure
      .input(universityIdSchema)
      .mutation(async ({ input }) => {
        return deleteUniversity(input.id);
      }),
  });
