import {
  createUniversity,
  deleteUniversity,
  updateUniversity,
} from "../api/universities/mutations";
import {
  getUniversities,
  getUniversityById,
} from "../api/universities/queries";
import {
  insertUniversityParams,
  universityIdSchema,
  updateUniversityParams,
} from "../db/schema/universities";
import { publicProcedure, router } from "../server/trpc";

export const universitiesRouter = router({
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
