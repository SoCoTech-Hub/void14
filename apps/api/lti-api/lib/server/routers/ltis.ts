import { createLti, deleteLti, updateLti } from "../api/ltis/mutations";
import { getLtiById, getLtis } from "../api/ltis/queries";
import {
  insertLtiParams,
  ltiIdSchema,
  updateLtiParams,
} from "../db/schema/ltis";
import { publicProcedure, router } from "../server/trpc";

export const ltisRouter = router({
  getLtis: publicProcedure.query(async () => {
    return getLtis();
  }),
  getLtiById: publicProcedure.input(ltiIdSchema).query(async ({ input }) => {
    return getLtiById(input.id);
  }),
  createLti: publicProcedure
    .input(insertLtiParams)
    .mutation(async ({ input }) => {
      return createLti(input);
    }),
  updateLti: publicProcedure
    .input(updateLtiParams)
    .mutation(async ({ input }) => {
      return updateLti(input.id, input);
    }),
  deleteLti: publicProcedure.input(ltiIdSchema).mutation(async ({ input }) => {
    return deleteLti(input.id);
  }),
});
