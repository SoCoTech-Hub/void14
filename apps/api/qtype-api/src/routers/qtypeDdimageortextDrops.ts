import { getQtypeDdimageortextDropById, getQtypeDdimageortextDrops } from "../api/qtypeDdimageortextDrops/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  qtypeDdimageortextDropIdSchema,
  insertQtypeDdimageortextDropParams,
  updateQtypeDdimageortextDropParams,
} from "@soco/qtype-db/schema/qtypeDdimageortextDrops";
import { createQtypeDdimageortextDrop, deleteQtypeDdimageortextDrop, updateQtypeDdimageortextDrop } from "../api/qtypeDdimageortextDrops/mutations";

export const qtypeDdimageortextDropsRouter =createTRPCRouter({
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
