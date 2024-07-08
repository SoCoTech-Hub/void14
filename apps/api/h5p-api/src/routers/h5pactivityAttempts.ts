import { getH5pactivityAttemptById, getH5pactivityAttempts } from "../api/h5pactivityAttempts/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  h5pactivityAttemptIdSchema,
  insertH5pactivityAttemptParams,
  updateH5pactivityAttemptParams,
} from "@soco/h5p-db/schema/h5pactivityAttempts";
import { createH5pactivityAttempt, deleteH5pactivityAttempt, updateH5pactivityAttempt } from "../api/h5pactivityAttempts/mutations";

export const h5pactivityAttemptsRouter =createTRPCRouter({
  getH5pactivityAttempts: publicProcedure.query(async () => {
    return getH5pactivityAttempts();
  }),
  getH5pactivityAttemptById: publicProcedure.input(h5pactivityAttemptIdSchema).query(async ({ input }) => {
    return getH5pactivityAttemptById(input.id);
  }),
  createH5pactivityAttempt: publicProcedure
    .input(insertH5pactivityAttemptParams)
    .mutation(async ({ input }) => {
      return createH5pactivityAttempt(input);
    }),
  updateH5pactivityAttempt: publicProcedure
    .input(updateH5pactivityAttemptParams)
    .mutation(async ({ input }) => {
      return updateH5pactivityAttempt(input.id, input);
    }),
  deleteH5pactivityAttempt: publicProcedure
    .input(h5pactivityAttemptIdSchema)
    .mutation(async ({ input }) => {
      return deleteH5pactivityAttempt(input.id);
    }),
});
