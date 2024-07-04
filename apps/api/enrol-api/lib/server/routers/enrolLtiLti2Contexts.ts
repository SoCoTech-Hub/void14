import {
  createEnrolLtiLti2Context,
  deleteEnrolLtiLti2Context,
  updateEnrolLtiLti2Context,
} from "../api/enrolLtiLti2Contexts/mutations";
import {
  getEnrolLtiLti2ContextById,
  getEnrolLtiLti2Contexts,
} from "../api/enrolLtiLti2Contexts/queries";
import {
  enrolLtiLti2ContextIdSchema,
  insertEnrolLtiLti2ContextParams,
  updateEnrolLtiLti2ContextParams,
} from "../db/schema/enrolLtiLti2Contexts";
import { publicProcedure, router } from "../server/trpc";

export const enrolLtiLti2ContextsRouter = router({
  getEnrolLtiLti2Contexts: publicProcedure.query(async () => {
    return getEnrolLtiLti2Contexts();
  }),
  getEnrolLtiLti2ContextById: publicProcedure
    .input(enrolLtiLti2ContextIdSchema)
    .query(async ({ input }) => {
      return getEnrolLtiLti2ContextById(input.id);
    }),
  createEnrolLtiLti2Context: publicProcedure
    .input(insertEnrolLtiLti2ContextParams)
    .mutation(async ({ input }) => {
      return createEnrolLtiLti2Context(input);
    }),
  updateEnrolLtiLti2Context: publicProcedure
    .input(updateEnrolLtiLti2ContextParams)
    .mutation(async ({ input }) => {
      return updateEnrolLtiLti2Context(input.id, input);
    }),
  deleteEnrolLtiLti2Context: publicProcedure
    .input(enrolLtiLti2ContextIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrolLtiLti2Context(input.id);
    }),
});
