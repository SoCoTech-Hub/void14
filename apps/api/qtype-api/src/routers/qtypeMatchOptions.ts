import { getQtypeMatchOptionById, getQtypeMatchOptions } from "../api/qtypeMatchOptions/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  qtypeMatchOptionIdSchema,
  insertQtypeMatchOptionParams,
  updateQtypeMatchOptionParams,
} from "@soco/qtype-db/schema/qtypeMatchOptions";
import { createQtypeMatchOption, deleteQtypeMatchOption, updateQtypeMatchOption } from "../api/qtypeMatchOptions/mutations";

export const qtypeMatchOptionsRouter =createTRPCRouter({
  getQtypeMatchOptions: publicProcedure.query(async () => {
    return getQtypeMatchOptions();
  }),
  getQtypeMatchOptionById: publicProcedure.input(qtypeMatchOptionIdSchema).query(async ({ input }) => {
    return getQtypeMatchOptionById(input.id);
  }),
  createQtypeMatchOption: publicProcedure
    .input(insertQtypeMatchOptionParams)
    .mutation(async ({ input }) => {
      return createQtypeMatchOption(input);
    }),
  updateQtypeMatchOption: publicProcedure
    .input(updateQtypeMatchOptionParams)
    .mutation(async ({ input }) => {
      return updateQtypeMatchOption(input.id, input);
    }),
  deleteQtypeMatchOption: publicProcedure
    .input(qtypeMatchOptionIdSchema)
    .mutation(async ({ input }) => {
      return deleteQtypeMatchOption(input.id);
    }),
});
