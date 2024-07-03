import { getQtypeDdimageortextDragById, getQtypeDdimageortextDrags } from "@/lib/api/qtypeDdimageortextDrags/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  qtypeDdimageortextDragIdSchema,
  insertQtypeDdimageortextDragParams,
  updateQtypeDdimageortextDragParams,
} from "@/lib/db/schema/qtypeDdimageortextDrags";
import { createQtypeDdimageortextDrag, deleteQtypeDdimageortextDrag, updateQtypeDdimageortextDrag } from "@/lib/api/qtypeDdimageortextDrags/mutations";

export const qtypeDdimageortextDragsRouter = router({
  getQtypeDdimageortextDrags: publicProcedure.query(async () => {
    return getQtypeDdimageortextDrags();
  }),
  getQtypeDdimageortextDragById: publicProcedure.input(qtypeDdimageortextDragIdSchema).query(async ({ input }) => {
    return getQtypeDdimageortextDragById(input.id);
  }),
  createQtypeDdimageortextDrag: publicProcedure
    .input(insertQtypeDdimageortextDragParams)
    .mutation(async ({ input }) => {
      return createQtypeDdimageortextDrag(input);
    }),
  updateQtypeDdimageortextDrag: publicProcedure
    .input(updateQtypeDdimageortextDragParams)
    .mutation(async ({ input }) => {
      return updateQtypeDdimageortextDrag(input.id, input);
    }),
  deleteQtypeDdimageortextDrag: publicProcedure
    .input(qtypeDdimageortextDragIdSchema)
    .mutation(async ({ input }) => {
      return deleteQtypeDdimageortextDrag(input.id);
    }),
});
