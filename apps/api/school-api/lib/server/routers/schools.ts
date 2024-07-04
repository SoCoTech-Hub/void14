import {
  createSchool,
  deleteSchool,
  updateSchool,
} from "../api/schools/mutations";
import { getSchoolById, getSchools } from "../api/schools/queries";
import {
  insertSchoolParams,
  schoolIdSchema,
  updateSchoolParams,
} from "../db/schema/schools";
import { publicProcedure, router } from "../server/trpc";

export const schoolsRouter = router({
  getSchools: publicProcedure.query(async () => {
    return getSchools();
  }),
  getSchoolById: publicProcedure
    .input(schoolIdSchema)
    .query(async ({ input }) => {
      return getSchoolById(input.id);
    }),
  createSchool: publicProcedure
    .input(insertSchoolParams)
    .mutation(async ({ input }) => {
      return createSchool(input);
    }),
  updateSchool: publicProcedure
    .input(updateSchoolParams)
    .mutation(async ({ input }) => {
      return updateSchool(input.id, input);
    }),
  deleteSchool: publicProcedure
    .input(schoolIdSchema)
    .mutation(async ({ input }) => {
      return deleteSchool(input.id);
    }),
});
