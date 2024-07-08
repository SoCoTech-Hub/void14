import { getLtiserviceGradebookserviceById, getLtiserviceGradebookservices } from "../api/ltiserviceGradebookservices/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  ltiserviceGradebookserviceIdSchema,
  insertLtiserviceGradebookserviceParams,
  updateLtiserviceGradebookserviceParams,
} from "@soco/lti-db/schema/ltiserviceGradebookservices";
import { createLtiserviceGradebookservice, deleteLtiserviceGradebookservice, updateLtiserviceGradebookservice } from "../api/ltiserviceGradebookservices/mutations";

export const ltiserviceGradebookservicesRouter =createTRPCRouter({
  getLtiserviceGradebookservices: publicProcedure.query(async () => {
    return getLtiserviceGradebookservices();
  }),
  getLtiserviceGradebookserviceById: publicProcedure.input(ltiserviceGradebookserviceIdSchema).query(async ({ input }) => {
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
