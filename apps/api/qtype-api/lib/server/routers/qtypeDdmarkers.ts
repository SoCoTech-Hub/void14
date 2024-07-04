import {
  createQtypeDdmarker,
  deleteQtypeDdmarker,
  updateQtypeDdmarker,
} from "../api/qtypeDdmarkers/mutations";
import {
  getQtypeDdmarkerById,
  getQtypeDdmarkers,
} from "../api/qtypeDdmarkers/queries";
import {
  insertQtypeDdmarkerParams,
  qtypeDdmarkerIdSchema,
  updateQtypeDdmarkerParams,
} from "../db/schema/qtypeDdmarkers";
import { publicProcedure, router } from "../server/trpc";

export const qtypeDdmarkersRouter = router({
  getQtypeDdmarkers: publicProcedure.query(async () => {
    return getQtypeDdmarkers();
  }),
  getQtypeDdmarkerById: publicProcedure
    .input(qtypeDdmarkerIdSchema)
    .query(async ({ input }) => {
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
