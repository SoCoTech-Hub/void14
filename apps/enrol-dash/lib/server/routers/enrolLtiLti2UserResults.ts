import { getEnrolLtiLti2UserResultById, getEnrolLtiLti2UserResults } from "@/lib/api/enrolLtiLti2UserResults/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  enrolLtiLti2UserResultIdSchema,
  insertEnrolLtiLti2UserResultParams,
  updateEnrolLtiLti2UserResultParams,
} from "@/lib/db/schema/enrolLtiLti2UserResults";
import { createEnrolLtiLti2UserResult, deleteEnrolLtiLti2UserResult, updateEnrolLtiLti2UserResult } from "@/lib/api/enrolLtiLti2UserResults/mutations";

export const enrolLtiLti2UserResultsRouter = router({
  getEnrolLtiLti2UserResults: publicProcedure.query(async () => {
    return getEnrolLtiLti2UserResults();
  }),
  getEnrolLtiLti2UserResultById: publicProcedure.input(enrolLtiLti2UserResultIdSchema).query(async ({ input }) => {
    return getEnrolLtiLti2UserResultById(input.id);
  }),
  createEnrolLtiLti2UserResult: publicProcedure
    .input(insertEnrolLtiLti2UserResultParams)
    .mutation(async ({ input }) => {
      return createEnrolLtiLti2UserResult(input);
    }),
  updateEnrolLtiLti2UserResult: publicProcedure
    .input(updateEnrolLtiLti2UserResultParams)
    .mutation(async ({ input }) => {
      return updateEnrolLtiLti2UserResult(input.id, input);
    }),
  deleteEnrolLtiLti2UserResult: publicProcedure
    .input(enrolLtiLti2UserResultIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrolLtiLti2UserResult(input.id);
    }),
});
