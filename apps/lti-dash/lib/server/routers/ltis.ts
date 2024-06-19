import { getLtiById, getLtis } from "@/lib/api/ltis/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  ltiIdSchema,
  insertLtiParams,
  updateLtiParams,
} from "@/lib/db/schema/ltis";
import { createLti, deleteLti, updateLti } from "@/lib/api/ltis/mutations";

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
  deleteLti: publicProcedure
    .input(ltiIdSchema)
    .mutation(async ({ input }) => {
      return deleteLti(input.id);
    }),
});
