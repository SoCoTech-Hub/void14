import { getH5pById, getH5ps } from "@/lib/api/h5ps/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  h5pIdSchema,
  insertH5pParams,
  updateH5pParams,
} from "@/lib/db/schema/h5ps";
import { createH5p, deleteH5p, updateH5p } from "@/lib/api/h5ps/mutations";

export const h5psRouter = router({
  getH5ps: publicProcedure.query(async () => {
    return getH5ps();
  }),
  getH5pById: publicProcedure.input(h5pIdSchema).query(async ({ input }) => {
    return getH5pById(input.id);
  }),
  createH5p: publicProcedure
    .input(insertH5pParams)
    .mutation(async ({ input }) => {
      return createH5p(input);
    }),
  updateH5p: publicProcedure
    .input(updateH5pParams)
    .mutation(async ({ input }) => {
      return updateH5p(input.id, input);
    }),
  deleteH5p: publicProcedure
    .input(h5pIdSchema)
    .mutation(async ({ input }) => {
      return deleteH5p(input.id);
    }),
});
