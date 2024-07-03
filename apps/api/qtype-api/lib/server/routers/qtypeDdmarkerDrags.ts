import { getQtypeDdmarkerDragById, getQtypeDdmarkerDrags } from "@/lib/api/qtypeDdmarkerDrags/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  qtypeDdmarkerDragIdSchema,
  insertQtypeDdmarkerDragParams,
  updateQtypeDdmarkerDragParams,
} from "@/lib/db/schema/qtypeDdmarkerDrags";
import { createQtypeDdmarkerDrag, deleteQtypeDdmarkerDrag, updateQtypeDdmarkerDrag } from "@/lib/api/qtypeDdmarkerDrags/mutations";

export const qtypeDdmarkerDragsRouter = router({
  getQtypeDdmarkerDrags: publicProcedure.query(async () => {
    return getQtypeDdmarkerDrags();
  }),
  getQtypeDdmarkerDragById: publicProcedure.input(qtypeDdmarkerDragIdSchema).query(async ({ input }) => {
    return getQtypeDdmarkerDragById(input.id);
  }),
  createQtypeDdmarkerDrag: publicProcedure
    .input(insertQtypeDdmarkerDragParams)
    .mutation(async ({ input }) => {
      return createQtypeDdmarkerDrag(input);
    }),
  updateQtypeDdmarkerDrag: publicProcedure
    .input(updateQtypeDdmarkerDragParams)
    .mutation(async ({ input }) => {
      return updateQtypeDdmarkerDrag(input.id, input);
    }),
  deleteQtypeDdmarkerDrag: publicProcedure
    .input(qtypeDdmarkerDragIdSchema)
    .mutation(async ({ input }) => {
      return deleteQtypeDdmarkerDrag(input.id);
    }),
});
