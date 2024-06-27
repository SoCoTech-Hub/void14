import { getEnrolLtiDeploymentById, getEnrolLtiDeployments } from "@/lib/api/enrolLtiDeployments/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  enrolLtiDeploymentIdSchema,
  insertEnrolLtiDeploymentParams,
  updateEnrolLtiDeploymentParams,
} from "@/lib/db/schema/enrolLtiDeployments";
import { createEnrolLtiDeployment, deleteEnrolLtiDeployment, updateEnrolLtiDeployment } from "@/lib/api/enrolLtiDeployments/mutations";

export const enrolLtiDeploymentsRouter = router({
  getEnrolLtiDeployments: publicProcedure.query(async () => {
    return getEnrolLtiDeployments();
  }),
  getEnrolLtiDeploymentById: publicProcedure.input(enrolLtiDeploymentIdSchema).query(async ({ input }) => {
    return getEnrolLtiDeploymentById(input.id);
  }),
  createEnrolLtiDeployment: publicProcedure
    .input(insertEnrolLtiDeploymentParams)
    .mutation(async ({ input }) => {
      return createEnrolLtiDeployment(input);
    }),
  updateEnrolLtiDeployment: publicProcedure
    .input(updateEnrolLtiDeploymentParams)
    .mutation(async ({ input }) => {
      return updateEnrolLtiDeployment(input.id, input);
    }),
  deleteEnrolLtiDeployment: publicProcedure
    .input(enrolLtiDeploymentIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrolLtiDeployment(input.id);
    }),
});
