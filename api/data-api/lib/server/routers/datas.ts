import { getDataById, getDatas } from "@/lib/api/datas/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  dataIdSchema,
  insertDataParams,
  updateDataParams,
} from "@/lib/db/schema/datas";
import { createData, deleteData, updateData } from "@/lib/api/datas/mutations";

export const datasRouter = router({
  getDatas: publicProcedure.query(async () => {
    return getDatas();
  }),
  getDataById: publicProcedure.input(dataIdSchema).query(async ({ input }) => {
    return getDataById(input.id);
  }),
  createData: publicProcedure
    .input(insertDataParams)
    .mutation(async ({ input }) => {
      return createData(input);
    }),
  updateData: publicProcedure
    .input(updateDataParams)
    .mutation(async ({ input }) => {
      return updateData(input.id, input);
    }),
  deleteData: publicProcedure
    .input(dataIdSchema)
    .mutation(async ({ input }) => {
      return deleteData(input.id);
    }),
});
