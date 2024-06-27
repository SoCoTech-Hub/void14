import { getQualificationById, getQualifications } from "@/lib/api/qualifications/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  qualificationIdSchema,
  insertQualificationParams,
  updateQualificationParams,
} from "@/lib/db/schema/qualifications";
import { createQualification, deleteQualification, updateQualification } from "@/lib/api/qualifications/mutations";

export const qualificationsRouter = router({
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
