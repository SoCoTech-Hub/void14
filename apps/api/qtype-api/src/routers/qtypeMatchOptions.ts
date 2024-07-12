import {
  insertQtypeMatchOptionParams,
  qtypeMatchOptionIdSchema,
  updateQtypeMatchOptionParams,
} from "@soco/qtype-db/schema/qtypeMatchOptions";

import {
  createQtypeMatchOption,
  deleteQtypeMatchOption,
  updateQtypeMatchOption,
} from "../api/qtypeMatchOptions/mutations";
import {
  getQtypeMatchOptionById,
  getQtypeMatchOptions,
} from "../api/qtypeMatchOptions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const qtypeMatchOptionsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getQtypeMatchOptions: publicProcedure.query(async () => {
      return getQtypeMatchOptions();
    }),
    getQtypeMatchOptionById: publicProcedure
      .input(qtypeMatchOptionIdSchema)
      .query(async ({ input }) => {
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
