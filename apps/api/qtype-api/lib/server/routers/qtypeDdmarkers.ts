import { getQtypeDdmarkerById, getQtypeDdmarkers } from "@/lib/api/qtypeDdmarkers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  qtypeDdmarkerIdSchema,
  insertQtypeDdmarkerParams,
  updateQtypeDdmarkerParams,
} from "@/lib/db/schema/qtypeDdmarkers";
import { createQtypeDdmarker, deleteQtypeDdmarker, updateQtypeDdmarker } from "@/lib/api/qtypeDdmarkers/mutations";

export const qtypeDdmarkersRouter = router({
  getQtypeDdmarkers: publicProcedure.query(async () => {
    return getQtypeDdmarkers();
  }),
  getQtypeDdmarkerById: publicProcedure.input(qtypeDdmarkerIdSchema).query(async ({ input }) => {
    return getQtypeDdmarkerById(input.id);
  }),
  createQtypeDdmarker: publicProcedure
    .input(insertQtypeDdmarkerParams)
    .mutation(async ({ input }) => {
      return createQtypeDdmarker(input);
    }),
  updateQtypeDdmarker: publicProcedure
    .input(updateQtypeDdmarkerParams)
    .mutation(async ({ input }) => {
      return updateQtypeDdmarker(input.id, input);
    }),
  deleteQtypeDdmarker: publicProcedure
    .input(qtypeDdmarkerIdSchema)
    .mutation(async ({ input }) => {
      return deleteQtypeDdmarker(input.id);
    }),
});
