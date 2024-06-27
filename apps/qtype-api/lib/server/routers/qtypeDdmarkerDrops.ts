import { getQtypeDdmarkerDropById, getQtypeDdmarkerDrops } from "@/lib/api/qtypeDdmarkerDrops/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  qtypeDdmarkerDropIdSchema,
  insertQtypeDdmarkerDropParams,
  updateQtypeDdmarkerDropParams,
} from "@/lib/db/schema/qtypeDdmarkerDrops";
import { createQtypeDdmarkerDrop, deleteQtypeDdmarkerDrop, updateQtypeDdmarkerDrop } from "@/lib/api/qtypeDdmarkerDrops/mutations";

export const qtypeDdmarkerDropsRouter = router({
  getQtypeDdmarkerDrops: publicProcedure.query(async () => {
    return getQtypeDdmarkerDrops();
  }),
  getQtypeDdmarkerDropById: publicProcedure.input(qtypeDdmarkerDropIdSchema).query(async ({ input }) => {
    return getQtypeDdmarkerDropById(input.id);
  }),
  createQtypeDdmarkerDrop: publicProcedure
    .input(insertQtypeDdmarkerDropParams)
    .mutation(async ({ input }) => {
      return createQtypeDdmarkerDrop(input);
    }),
  updateQtypeDdmarkerDrop: publicProcedure
    .input(updateQtypeDdmarkerDropParams)
    .mutation(async ({ input }) => {
      return updateQtypeDdmarkerDrop(input.id, input);
    }),
  deleteQtypeDdmarkerDrop: publicProcedure
    .input(qtypeDdmarkerDropIdSchema)
    .mutation(async ({ input }) => {
      return deleteQtypeDdmarkerDrop(input.id);
    }),
});
