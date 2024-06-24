import { getH5pactivityById, getH5pactivities } from "@/lib/api/h5pactivities/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  h5pactivityIdSchema,
  insertH5pactivityParams,
  updateH5pactivityParams,
} from "@/lib/db/schema/h5pactivities";
import { createH5pactivity, deleteH5pactivity, updateH5pactivity } from "@/lib/api/h5pactivities/mutations";

export const h5pactivitiesRouter = router({
  getH5pactivities: publicProcedure.query(async () => {
    return getH5pactivities();
  }),
  getH5pactivityById: publicProcedure.input(h5pactivityIdSchema).query(async ({ input }) => {
    return getH5pactivityById(input.id);
  }),
  createH5pactivity: publicProcedure
    .input(insertH5pactivityParams)
    .mutation(async ({ input }) => {
      return createH5pactivity(input);
    }),
  updateH5pactivity: publicProcedure
    .input(updateH5pactivityParams)
    .mutation(async ({ input }) => {
      return updateH5pactivity(input.id, input);
    }),
  deleteH5pactivity: publicProcedure
    .input(h5pactivityIdSchema)
    .mutation(async ({ input }) => {
      return deleteH5pactivity(input.id);
    }),
});
