import { getUniversityById, getUniversities } from "../api/universities/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  universityIdSchema,
  insertUniversityParams,
  updateUniversityParams,
} from "@soco/universities-db/schema/universities";
import { createUniversity, deleteUniversity, updateUniversity } from "../api/universities/mutations";

export const universitiesRouter =createTRPCRouter({
  getUniversities: publicProcedure.query(async () => {
    return getUniversities();
  }),
  getUniversityById: publicProcedure.input(universityIdSchema).query(async ({ input }) => {
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
