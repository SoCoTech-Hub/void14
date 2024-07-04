import {
  createEnrolLtiDeployment,
  deleteEnrolLtiDeployment,
  updateEnrolLtiDeployment,
} from "../api/enrolLtiDeployments/mutations";
import {
  getEnrolLtiDeploymentById,
  getEnrolLtiDeployments,
} from "../api/enrolLtiDeployments/queries";
import {
  enrolLtiDeploymentIdSchema,
  insertEnrolLtiDeploymentParams,
  updateEnrolLtiDeploymentParams,
} from "../db/schema/enrolLtiDeployments";
import { publicProcedure, router } from "../server/trpc";

export const enrolLtiDeploymentsRouter = router({
  getEnrolLtiDeployments: publicProcedure.query(async () => {
    return getEnrolLtiDeployments();
  }),
  getEnrolLtiDeploymentById: publicProcedure
    .input(enrolLtiDeploymentIdSchema)
    .query(async ({ input }) => {
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
