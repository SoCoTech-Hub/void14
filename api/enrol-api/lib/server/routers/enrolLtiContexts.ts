import { getEnrolLtiContextById, getEnrolLtiContexts } from "@/lib/api/enrolLtiContexts/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  enrolLtiContextIdSchema,
  insertEnrolLtiContextParams,
  updateEnrolLtiContextParams,
} from "@/lib/db/schema/enrolLtiContexts";
import { createEnrolLtiContext, deleteEnrolLtiContext, updateEnrolLtiContext } from "@/lib/api/enrolLtiContexts/mutations";

export const enrolLtiContextsRouter = router({
  getEnrolLtiContexts: publicProcedure.query(async () => {
    return getEnrolLtiContexts();
  }),
  getEnrolLtiContextById: publicProcedure.input(enrolLtiContextIdSchema).query(async ({ input }) => {
    return getEnrolLtiContextById(input.id);
  }),
  createEnrolLtiContext: publicProcedure
    .input(insertEnrolLtiContextParams)
    .mutation(async ({ input }) => {
      return createEnrolLtiContext(input);
    }),
  updateEnrolLtiContext: publicProcedure
    .input(updateEnrolLtiContextParams)
    .mutation(async ({ input }) => {
      return updateEnrolLtiContext(input.id, input);
    }),
  deleteEnrolLtiContext: publicProcedure
    .input(enrolLtiContextIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrolLtiContext(input.id);
    }),
});
