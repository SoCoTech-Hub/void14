import { getQtypeDdmarkerDragById, getQtypeDdmarkerDrags } from "../api/qtypeDdmarkerDrags/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  qtypeDdmarkerDragIdSchema,
  insertQtypeDdmarkerDragParams,
  updateQtypeDdmarkerDragParams,
} from "@soco/qtype-db/schema/qtypeDdmarkerDrags";
import { createQtypeDdmarkerDrag, deleteQtypeDdmarkerDrag, updateQtypeDdmarkerDrag } from "../api/qtypeDdmarkerDrags/mutations";

export const qtypeDdmarkerDragsRouter =createTRPCRouter({
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