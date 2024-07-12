import {
  insertQtypeEssayOptionParams,
  qtypeEssayOptionIdSchema,
  updateQtypeEssayOptionParams,
} from "@soco/qtype-db/schema/qtypeEssayOptions";

import {
  createQtypeEssayOption,
  deleteQtypeEssayOption,
  updateQtypeEssayOption,
} from "../api/qtypeEssayOptions/mutations";
import {
  getQtypeEssayOptionById,
  getQtypeEssayOptions,
} from "../api/qtypeEssayOptions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const qtypeEssayOptionsRouter = createTRPCRouter({
  getQtypeEssayOptions: publicProcedure.query(async () => {
    return getQtypeEssayOptions();
  }),
  getQtypeEssayOptionById: publicProcedure
    .input(qtypeEssayOptionIdSchema)
    .query(async ({ input }) => {
      return getQtypeEssayOptionById(input.id);
    }),
  createQtypeEssayOption: publicProcedure
    .input(insertQtypeEssayOptionParams)
    .mutation(async ({ input }) => {
      return createQtypeEssayOption(input);
    }),
  updateQtypeEssayOption: publicProcedure
    .input(updateQtypeEssayOptionParams)
    .mutation(async ({ input }) => {
      return updateQtypeEssayOption(input.id, input);
    }),
  deleteQtypeEssayOption: publicProcedure
    .input(qtypeEssayOptionIdSchema)
    .mutation(async ({ input }) => {
      return deleteQtypeEssayOption(input.id);
    }),
});
