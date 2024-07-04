import {
  createSupportDepartment,
  deleteSupportDepartment,
  updateSupportDepartment,
} from "../api/supportDepartments/mutations";
import {
  getSupportDepartmentById,
  getSupportDepartments,
} from "../api/supportDepartments/queries";
import {
  insertSupportDepartmentParams,
  supportDepartmentIdSchema,
  updateSupportDepartmentParams,
} from "../db/schema/supportDepartments";
import { publicProcedure, router } from "../server/trpc";

export const supportDepartmentsRouter = router({
  getSupportDepartments: publicProcedure.query(async () => {
    return getSupportDepartments();
  }),
  getSupportDepartmentById: publicProcedure
    .input(supportDepartmentIdSchema)
    .query(async ({ input }) => {
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
