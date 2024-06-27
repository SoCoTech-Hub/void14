import { getLtiserviceGradebookserviceById, getLtiserviceGradebookservices } from "@/lib/api/ltiserviceGradebookservices/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  ltiserviceGradebookserviceIdSchema,
  insertLtiserviceGradebookserviceParams,
  updateLtiserviceGradebookserviceParams,
} from "@/lib/db/schema/ltiserviceGradebookservices";
import { createLtiserviceGradebookservice, deleteLtiserviceGradebookservice, updateLtiserviceGradebookservice } from "@/lib/api/ltiserviceGradebookservices/mutations";

export const ltiserviceGradebookservicesRouter = router({
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
