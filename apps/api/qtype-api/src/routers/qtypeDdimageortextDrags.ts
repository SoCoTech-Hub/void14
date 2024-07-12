import {
  insertQtypeDdimageortextDragParams,
  qtypeDdimageortextDragIdSchema,
  updateQtypeDdimageortextDragParams,
} from "@soco/qtype-db/schema/qtypeDdimageortextDrags";

import {
  createQtypeDdimageortextDrag,
  deleteQtypeDdimageortextDrag,
  updateQtypeDdimageortextDrag,
} from "../api/qtypeDdimageortextDrags/mutations";
import {
  getQtypeDdimageortextDragById,
  getQtypeDdimageortextDrags,
} from "../api/qtypeDdimageortextDrags/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const qtypeDdimageortextDragsRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getQtypeDdimageortextDrags: publicProcedure.query(async () => {
    return getQtypeDdimageortextDrags();
  }),
  getQtypeDdimageortextDragById: publicProcedure
    .input(qtypeDdimageortextDragIdSchema)
    .query(async ({ input }) => {
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
