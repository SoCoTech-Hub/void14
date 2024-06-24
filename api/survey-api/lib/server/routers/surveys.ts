import { getSurveyById, getSurveys } from "@/lib/api/surveys/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  surveyIdSchema,
  insertSurveyParams,
  updateSurveyParams,
} from "@/lib/db/schema/surveys";
import { createSurvey, deleteSurvey, updateSurvey } from "@/lib/api/surveys/mutations";

export const surveysRouter = router({
  getSurveys: publicProcedure.query(async () => {
    return getSurveys();
  }),
  getSurveyById: publicProcedure.input(surveyIdSchema).query(async ({ input }) => {
    return getSurveyById(input.id);
  }),
  createSurvey: publicProcedure
    .input(insertSurveyParams)
    .mutation(async ({ input }) => {
      return createSurvey(input);
    }),
  updateSurvey: publicProcedure
    .input(updateSurveyParams)
    .mutation(async ({ input }) => {
      return updateSurvey(input.id, input);
    }),
  deleteSurvey: publicProcedure
    .input(surveyIdSchema)
    .mutation(async ({ input }) => {
      return deleteSurvey(input.id);
    }),
});
