import { getNextOfKinById, getNextOfKins } from "@/lib/api/nextOfKins/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  nextOfKinIdSchema,
  insertNextOfKinParams,
  updateNextOfKinParams,
} from "@/lib/db/schema/nextOfKins";
import { createNextOfKin, deleteNextOfKin, updateNextOfKin } from "@/lib/api/nextOfKins/mutations";

export const nextOfKinsRouter = router({
  getNextOfKins: publicProcedure.query(async () => {
    return getNextOfKins();
  }),
  getNextOfKinById: publicProcedure.input(nextOfKinIdSchema).query(async ({ input }) => {
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
