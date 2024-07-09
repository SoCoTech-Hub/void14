import { getQtypeDdimageortextById, getQtypeDdimageortexts } from "../api/qtypeDdimageortexts/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  qtypeDdimageortextIdSchema,
  insertQtypeDdimageortextParams,
  updateQtypeDdimageortextParams,
} from "@soco/qtype-db/schema/qtypeDdimageortexts";
import { createQtypeDdimageortext, deleteQtypeDdimageortext, updateQtypeDdimageortext } from "../api/qtypeDdimageortexts/mutations";

export const qtypeDdimageortextsRouter =createTRPCRouter({
  getQtypeDdimageortexts: publicProcedure.query(async () => {
    return getQtypeDdimageortexts();
  }),
  getQtypeDdimageortextById: publicProcedure.input(qtypeDdimageortextIdSchema).query(async ({ input }) => {
    return getQtypeDdimageortextById(input.id);
  }),
  createQtypeDdimageortext: publicProcedure
    .input(insertQtypeDdimageortextParams)
    .mutation(async ({ input }) => {
      return createQtypeDdimageortext(input);
    }),
  updateQtypeDdimageortext: publicProcedure
    .input(updateQtypeDdimageortextParams)
    .mutation(async ({ input }) => {
      return updateQtypeDdimageortext(input.id, input);
    }),
  deleteQtypeDdimageortext: publicProcedure
    .input(qtypeDdimageortextIdSchema)
    .mutation(async ({ input }) => {
      return deleteQtypeDdimageortext(input.id);
    }),
});