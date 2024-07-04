import {
  createNextOfKin,
  deleteNextOfKin,
  updateNextOfKin,
} from "../api/nextOfKins/mutations";
import { getNextOfKinById, getNextOfKins } from "../api/nextOfKins/queries";
import {
  insertNextOfKinParams,
  nextOfKinIdSchema,
  updateNextOfKinParams,
} from "../db/schema/nextOfKins";
import { publicProcedure, router } from "../server/trpc";

export const nextOfKinsRouter = router({
  getNextOfKins: publicProcedure.query(async () => {
    return getNextOfKins();
  }),
  getNextOfKinById: publicProcedure
    .input(nextOfKinIdSchema)
    .query(async ({ input }) => {
      return getNextOfKinById(input.id);
    }),
  createNextOfKin: publicProcedure
    .input(insertNextOfKinParams)
    .mutation(async ({ input }) => {
      return createNextOfKin(input);
    }),
  updateNextOfKin: publicProcedure
    .input(updateNextOfKinParams)
    .mutation(async ({ input }) => {
      return updateNextOfKin(input.id, input);
    }),
  deleteNextOfKin: publicProcedure
    .input(nextOfKinIdSchema)
    .mutation(async ({ input }) => {
      return deleteNextOfKin(input.id);
    }),
});
