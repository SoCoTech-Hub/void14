import {
  createLtiserviceGradebookservice,
  deleteLtiserviceGradebookservice,
  updateLtiserviceGradebookservice,
} from "../api/ltiserviceGradebookservices/mutations";
import {
  getLtiserviceGradebookserviceById,
  getLtiserviceGradebookservices,
} from "../api/ltiserviceGradebookservices/queries";
import {
  insertLtiserviceGradebookserviceParams,
  ltiserviceGradebookserviceIdSchema,
  updateLtiserviceGradebookserviceParams,
} from "../db/schema/ltiserviceGradebookservices";
import { publicProcedure, router } from "../server/trpc";

export const ltiserviceGradebookservicesRouter = router({
  getLtiserviceGradebookservices: publicProcedure.query(async () => {
    return getLtiserviceGradebookservices();
  }),
  getLtiserviceGradebookserviceById: publicProcedure
    .input(ltiserviceGradebookserviceIdSchema)
    .query(async ({ input }) => {
      return getLtiserviceGradebookserviceById(input.id);
    }),
  createLtiserviceGradebookservice: publicProcedure
    .input(insertLtiserviceGradebookserviceParams)
    .mutation(async ({ input }) => {
      return createLtiserviceGradebookservice(input);
    }),
  updateLtiserviceGradebookservice: publicProcedure
    .input(updateLtiserviceGradebookserviceParams)
    .mutation(async ({ input }) => {
      return updateLtiserviceGradebookservice(input.id, input);
    }),
  deleteLtiserviceGradebookservice: publicProcedure
    .input(ltiserviceGradebookserviceIdSchema)
    .mutation(async ({ input }) => {
      return deleteLtiserviceGradebookservice(input.id);
    }),
});
