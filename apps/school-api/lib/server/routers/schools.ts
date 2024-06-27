import { getSchoolById, getSchools } from "@/lib/api/schools/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  schoolIdSchema,
  insertSchoolParams,
  updateSchoolParams,
} from "@/lib/db/schema/schools";
import { createSchool, deleteSchool, updateSchool } from "@/lib/api/schools/mutations";

export const schoolsRouter = router({
  getSchools: publicProcedure.query(async () => {
    return getSchools();
  }),
  getSchoolById: publicProcedure.input(schoolIdSchema).query(async ({ input }) => {
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
