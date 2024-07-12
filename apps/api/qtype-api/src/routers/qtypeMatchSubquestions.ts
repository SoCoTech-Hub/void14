import {
  insertQtypeMatchSubquestionParams,
  qtypeMatchSubquestionIdSchema,
  updateQtypeMatchSubquestionParams,
} from "@soco/qtype-db/schema/qtypeMatchSubquestions";

import {
  createQtypeMatchSubquestion,
  deleteQtypeMatchSubquestion,
  updateQtypeMatchSubquestion,
} from "../api/qtypeMatchSubquestions/mutations";
import {
  getQtypeMatchSubquestionById,
  getQtypeMatchSubquestions,
} from "../api/qtypeMatchSubquestions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const qtypeMatchSubquestionsRouter = createTRPCRouter({
  getQtypeMatchSubquestions: publicProcedure.query(async () => {
    return getQtypeMatchSubquestions();
  }),
  getQtypeMatchSubquestionById: publicProcedure
    .input(qtypeMatchSubquestionIdSchema)
    .query(async ({ input }) => {
      return getQtypeMatchSubquestionById(input.id);
    }),
  createQtypeMatchSubquestion: publicProcedure
    .input(insertQtypeMatchSubquestionParams)
    .mutation(async ({ input }) => {
      return createQtypeMatchSubquestion(input);
    }),
  updateQtypeMatchSubquestion: publicProcedure
    .input(updateQtypeMatchSubquestionParams)
    .mutation(async ({ input }) => {
      return updateQtypeMatchSubquestion(input.id, input);
    }),
  deleteQtypeMatchSubquestion: publicProcedure
    .input(qtypeMatchSubquestionIdSchema)
    .mutation(async ({ input }) => {
      return deleteQtypeMatchSubquestion(input.id);
    }),
});
