import { getSupportDepartmentById, getSupportDepartments } from "../api/supportDepartments/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  supportDepartmentIdSchema,
  insertSupportDepartmentParams,
  updateSupportDepartmentParams,
} from "@soco/support-db/schema/supportDepartments";
import { createSupportDepartment, deleteSupportDepartment, updateSupportDepartment } from "../api/supportDepartments/mutations";

export const supportDepartmentsRouter =createTRPCRouter({
  getSupportDepartments: publicProcedure.query(async () => {
    return getSupportDepartments();
  }),
  getSupportDepartmentById: publicProcedure.input(supportDepartmentIdSchema).query(async ({ input }) => {
    return getSupportDepartmentById(input.id);
  }),
  createSupportDepartment: publicProcedure
    .input(insertSupportDepartmentParams)
    .mutation(async ({ input }) => {
      return createSupportDepartment(input);
    }),
  updateSupportDepartment: publicProcedure
    .input(updateSupportDepartmentParams)
    .mutation(async ({ input }) => {
      return updateSupportDepartment(input.id, input);
    }),
  deleteSupportDepartment: publicProcedure
    .input(supportDepartmentIdSchema)
    .mutation(async ({ input }) => {
      return deleteSupportDepartment(input.id);
    }),
});
