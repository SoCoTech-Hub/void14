import { getDigilibById, getDigilibs } from "@/lib/api/digilibs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  digilibIdSchema,
  insertDigilibParams,
  updateDigilibParams,
} from "@/lib/db/schema/digilibs";
import { createDigilib, deleteDigilib, updateDigilib } from "@/lib/api/digilibs/mutations";

export const digilibsRouter = router({
  getDigilibs: publicProcedure.query(async () => {
    return getDigilibs();
  }),
  getDigilibById: publicProcedure.input(digilibIdSchema).query(async ({ input }) => {
    return getDigilibById(input.id);
  }),
  createDigilib: publicProcedure
    .input(insertDigilibParams)
    .mutation(async ({ input }) => {
      return createDigilib(input);
    }),
  updateDigilib: publicProcedure
    .input(updateDigilibParams)
    .mutation(async ({ input }) => {
      return updateDigilib(input.id, input);
    }),
  deleteDigilib: publicProcedure
    .input(digilibIdSchema)
    .mutation(async ({ input }) => {
      return deleteDigilib(input.id);
    }),
});
