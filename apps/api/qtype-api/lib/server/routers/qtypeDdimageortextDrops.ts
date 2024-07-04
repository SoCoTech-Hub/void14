import {
  createQtypeDdimageortextDrop,
  deleteQtypeDdimageortextDrop,
  updateQtypeDdimageortextDrop,
} from "../api/qtypeDdimageortextDrops/mutations";
import {
  getQtypeDdimageortextDropById,
  getQtypeDdimageortextDrops,
} from "../api/qtypeDdimageortextDrops/queries";
import {
  insertQtypeDdimageortextDropParams,
  qtypeDdimageortextDropIdSchema,
  updateQtypeDdimageortextDropParams,
} from "../db/schema/qtypeDdimageortextDrops";
import { publicProcedure, router } from "../server/trpc";

export const qtypeDdimageortextDropsRouter = router({
  getQtypeDdimageortextDrops: publicProcedure.query(async () => {
    return getQtypeDdimageortextDrops();
  }),
  getQtypeDdimageortextDropById: publicProcedure
    .input(qtypeDdimageortextDropIdSchema)
    .query(async ({ input }) => {
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
