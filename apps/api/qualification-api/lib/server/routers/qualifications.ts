import {
  createQualification,
  deleteQualification,
  updateQualification,
} from "../api/qualifications/mutations";
import {
  getQualificationById,
  getQualifications,
} from "../api/qualifications/queries";
import {
  insertQualificationParams,
  qualificationIdSchema,
  updateQualificationParams,
} from "../db/schema/qualifications";
import { publicProcedure, router } from "../server/trpc";

export const qualificationsRouter = router({
  getQualifications: publicProcedure.query(async () => {
    return getQualifications();
  }),
  getQualificationById: publicProcedure
    .input(qualificationIdSchema)
    .query(async ({ input }) => {
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
