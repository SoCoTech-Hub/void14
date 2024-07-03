import { getQtypeDdimageortextDropById, getQtypeDdimageortextDrops } from "@/lib/api/qtypeDdimageortextDrops/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  qtypeDdimageortextDropIdSchema,
  insertQtypeDdimageortextDropParams,
  updateQtypeDdimageortextDropParams,
} from "@/lib/db/schema/qtypeDdimageortextDrops";
import { createQtypeDdimageortextDrop, deleteQtypeDdimageortextDrop, updateQtypeDdimageortextDrop } from "@/lib/api/qtypeDdimageortextDrops/mutations";

export const qtypeDdimageortextDropsRouter = router({
  getQtypeDdimageortextDrops: publicProcedure.query(async () => {
    return getQtypeDdimageortextDrops();
  }),
  getQtypeDdimageortextDropById: publicProcedure.input(qtypeDdimageortextDropIdSchema).query(async ({ input }) => {
    return getQtypeDdimageortextDropById(input.id);
  }),
  createQtypeDdimageortextDrop: publicProcedure
    .input(insertQtypeDdimageortextDropParams)
    .mutation(async ({ input }) => {
      return createQtypeDdimageortextDrop(input);
    }),
  updateQtypeDdimageortextDrop: publicProcedure
    .input(updateQtypeDdimageortextDropParams)
    .mutation(async ({ input }) => {
      return updateQtypeDdimageortextDrop(input.id, input);
    }),
  deleteQtypeDdimageortextDrop: publicProcedure
    .input(qtypeDdimageortextDropIdSchema)
    .mutation(async ({ input }) => {
      return deleteQtypeDdimageortextDrop(input.id);
    }),
});
