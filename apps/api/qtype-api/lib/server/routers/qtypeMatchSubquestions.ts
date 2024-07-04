import {
  createQtypeMatchSubquestion,
  deleteQtypeMatchSubquestion,
  updateQtypeMatchSubquestion,
} from "../api/qtypeMatchSubquestions/mutations";
import {
  getQtypeMatchSubquestionById,
  getQtypeMatchSubquestions,
} from "../api/qtypeMatchSubquestions/queries";
import {
  insertQtypeMatchSubquestionParams,
  qtypeMatchSubquestionIdSchema,
  updateQtypeMatchSubquestionParams,
} from "../db/schema/qtypeMatchSubquestions";
import { publicProcedure, router } from "../server/trpc";

export const qtypeMatchSubquestionsRouter = router({
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
