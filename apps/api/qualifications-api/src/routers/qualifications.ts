import { getQualificationById, getQualifications } from "../api/qualifications/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  qualificationIdSchema,
  insertQualificationParams,
  updateQualificationParams,
} from "@soco/qualifications-db/schema/qualifications";
import { createQualification, deleteQualification, updateQualification } from "../api/qualifications/mutations";

export const qualificationsRouter =createTRPCRouter({
  getQualifications: publicProcedure.query(async () => {
    return getQualifications();
  }),
  getQualificationById: publicProcedure.input(qualificationIdSchema).query(async ({ input }) => {
    return getQualificationById(input.id);
  }),
  createQualification: publicProcedure
    .input(insertQualificationParams)
    .mutation(async ({ input }) => {
      return createQualification(input);
    }),
  updateQualification: publicProcedure
    .input(updateQualificationParams)
    .mutation(async ({ input }) => {
      return updateQualification(input.id, input);
    }),
  deleteQualification: publicProcedure
    .input(qualificationIdSchema)
    .mutation(async ({ input }) => {
      return deleteQualification(input.id);
    }),
});
