import {
  enrolLtiToolConsumerMapIdSchema,
  insertEnrolLtiToolConsumerMapParams,
  updateEnrolLtiToolConsumerMapParams,
} from "@soco/enrol-db/schema/enrolLtiToolConsumerMaps";

import {
  createEnrolLtiToolConsumerMap,
  deleteEnrolLtiToolConsumerMap,
  updateEnrolLtiToolConsumerMap,
} from "../api/enrolLtiToolConsumerMaps/mutations";
import {
  getEnrolLtiToolConsumerMapById,
  getEnrolLtiToolConsumerMaps,
} from "../api/enrolLtiToolConsumerMaps/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const enrolLtiToolConsumerMapsRouter = createTRPCRouter({
  getEnrolLtiToolConsumerMaps: publicProcedure.query(async () => {
    return getEnrolLtiToolConsumerMaps();
  }),
  getEnrolLtiToolConsumerMapById: publicProcedure
    .input(enrolLtiToolConsumerMapIdSchema)
    .query(async ({ input }) => {
      return getEnrolLtiToolConsumerMapById(input.id);
    }),
  createEnrolLtiToolConsumerMap: publicProcedure
    .input(insertEnrolLtiToolConsumerMapParams)
    .mutation(async ({ input }) => {
      return createEnrolLtiToolConsumerMap(input);
    }),
  updateEnrolLtiToolConsumerMap: publicProcedure
    .input(updateEnrolLtiToolConsumerMapParams)
    .mutation(async ({ input }) => {
      return updateEnrolLtiToolConsumerMap(input.id, input);
    }),
  deleteEnrolLtiToolConsumerMap: publicProcedure
    .input(enrolLtiToolConsumerMapIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrolLtiToolConsumerMap(input.id);
    }),
});
