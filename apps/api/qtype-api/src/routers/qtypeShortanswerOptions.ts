import { getQtypeShortanswerOptionById, getQtypeShortanswerOptions } from "../api/qtypeShortanswerOptions/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  qtypeShortanswerOptionIdSchema,
  insertQtypeShortanswerOptionParams,
  updateQtypeShortanswerOptionParams,
} from "@soco/qtype-db/schema/qtypeShortanswerOptions";
import { createQtypeShortanswerOption, deleteQtypeShortanswerOption, updateQtypeShortanswerOption } from "../api/qtypeShortanswerOptions/mutations";

export const qtypeShortanswerOptionsRouter =createTRPCRouter({
  getQtypeShortanswerOptions: publicProcedure.query(async () => {
    return getQtypeShortanswerOptions();
  }),
  getQtypeShortanswerOptionById: publicProcedure.input(qtypeShortanswerOptionIdSchema).query(async ({ input }) => {
    return getQtypeShortanswerOptionById(input.id);
  }),
  createQtypeShortanswerOption: publicProcedure
    .input(insertQtypeShortanswerOptionParams)
    .mutation(async ({ input }) => {
      return createQtypeShortanswerOption(input);
    }),
  updateQtypeShortanswerOption: publicProcedure
    .input(updateQtypeShortanswerOptionParams)
    .mutation(async ({ input }) => {
      return updateQtypeShortanswerOption(input.id, input);
    }),
  deleteQtypeShortanswerOption: publicProcedure
    .input(qtypeShortanswerOptionIdSchema)
    .mutation(async ({ input }) => {
      return deleteQtypeShortanswerOption(input.id);
    }),
});
