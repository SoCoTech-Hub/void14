import { getSchoolById, getSchools } from "../api/schools/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  schoolIdSchema,
  insertSchoolParams,
  updateSchoolParams,
} from "@soco/school-db/schema/schools";
import { createSchool, deleteSchool, updateSchool } from "../api/schools/mutations";

export const schoolsRouter =createTRPCRouter({
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
