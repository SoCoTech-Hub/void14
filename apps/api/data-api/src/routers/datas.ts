import { getDataById, getDatas } from "../api/datas/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  dataIdSchema,
  insertDataParams,
  updateDataParams,
} from "@soco/data-db/schema/datas";
import { createData, deleteData, updateData } from "../api/datas/mutations";

export const datasRouter =createTRPCRouter({
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
