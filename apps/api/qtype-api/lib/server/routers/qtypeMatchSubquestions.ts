import { getQtypeMatchSubquestionById, getQtypeMatchSubquestions } from "@/lib/api/qtypeMatchSubquestions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  qtypeMatchSubquestionIdSchema,
  insertQtypeMatchSubquestionParams,
  updateQtypeMatchSubquestionParams,
} from "@/lib/db/schema/qtypeMatchSubquestions";
import { createQtypeMatchSubquestion, deleteQtypeMatchSubquestion, updateQtypeMatchSubquestion } from "@/lib/api/qtypeMatchSubquestions/mutations";

export const qtypeMatchSubquestionsRouter = router({
  getQtypeMatchSubquestions: publicProcedure.query(async () => {
    return getQtypeMatchSubquestions();
  }),
  getQtypeMatchSubquestionById: publicProcedure.input(qtypeMatchSubquestionIdSchema).query(async ({ input }) => {
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
