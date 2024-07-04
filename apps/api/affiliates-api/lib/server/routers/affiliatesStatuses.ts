import {
  createAffiliatesStatus,
  deleteAffiliatesStatus,
  updateAffiliatesStatus,
} from "../api/affiliatesStatuses/mutations";
import {
  getAffiliatesStatusById,
  getAffiliatesStatuses,
} from "../api/affiliatesStatuses/queries";
import {
  affiliatesStatusIdSchema,
  insertAffiliatesStatusParams,
  updateAffiliatesStatusParams,
} from "../db/schema/affiliatesStatuses";
import { publicProcedure, router } from "../server/trpc";

export const affiliatesStatusesRouter = router({
  getAffiliatesStatuses: publicProcedure.query(async () => {
    return getAffiliatesStatuses();
  }),
  getAffiliatesStatusById: publicProcedure
    .input(affiliatesStatusIdSchema)
    .query(async ({ input }) => {
      return getAffiliatesStatusById(input.id);
    }),
  createAffiliatesStatus: publicProcedure
    .input(insertAffiliatesStatusParams)
    .mutation(async ({ input }) => {
      return createAffiliatesStatus(input);
    }),
  updateAffiliatesStatus: publicProcedure
    .input(updateAffiliatesStatusParams)
    .mutation(async ({ input }) => {
      return updateAffiliatesStatus(input.id, input);
    }),
  deleteAffiliatesStatus: publicProcedure
    .input(affiliatesStatusIdSchema)
    .mutation(async ({ input }) => {
      return deleteAffiliatesStatus(input.id);
    }),
});
