import { getUniversityById, getUniversities } from "@/lib/api/universities/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  universityIdSchema,
  insertUniversityParams,
  updateUniversityParams,
} from "@/lib/db/schema/universities";
import { createUniversity, deleteUniversity, updateUniversity } from "@/lib/api/universities/mutations";

export const universitiesRouter = router({
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
