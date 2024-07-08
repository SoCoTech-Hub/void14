import { getEnrolLtiContextById, getEnrolLtiContexts } from "../api/enrolLtiContexts/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  enrolLtiContextIdSchema,
  insertEnrolLtiContextParams,
  updateEnrolLtiContextParams,
} from "@soco/enrol-db/schema/enrolLtiContexts";
import { createEnrolLtiContext, deleteEnrolLtiContext, updateEnrolLtiContext } from "../api/enrolLtiContexts/mutations";

export const enrolLtiContextsRouter =createTRPCRouter({
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
