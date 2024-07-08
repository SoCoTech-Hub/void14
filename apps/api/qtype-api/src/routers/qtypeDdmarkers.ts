import { getQtypeDdmarkerById, getQtypeDdmarkers } from "../api/qtypeDdmarkers/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  qtypeDdmarkerIdSchema,
  insertQtypeDdmarkerParams,
  updateQtypeDdmarkerParams,
} from "@soco/qtype-db/schema/qtypeDdmarkers";
import { createQtypeDdmarker, deleteQtypeDdmarker, updateQtypeDdmarker } from "../api/qtypeDdmarkers/mutations";

export const qtypeDdmarkersRouter =createTRPCRouter({
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
