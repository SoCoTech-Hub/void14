import { getCourseRequestById, getCourseRequests } from "../api/courseRequests/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  courseRequestIdSchema,
  insertCourseRequestParams,
  updateCourseRequestParams,
} from "@soco/course-db/schema/courseRequests";
import { createCourseRequest, deleteCourseRequest, updateCourseRequest } from "../api/courseRequests/mutations";

export const courseRequestsRouter =createTRPCRouter({
  getCourseRequests: publicProcedure.query(async () => {
    return getCourseRequests();
  }),
  getCourseRequestById: publicProcedure.input(courseRequestIdSchema).query(async ({ input }) => {
    return getCourseRequestById(input.id);
  }),
  createCourseRequest: publicProcedure
    .input(insertCourseRequestParams)
    .mutation(async ({ input }) => {
      return createCourseRequest(input);
    }),
  updateCourseRequest: publicProcedure
    .input(updateCourseRequestParams)
    .mutation(async ({ input }) => {
      return updateCourseRequest(input.id, input);
    }),
  deleteCourseRequest: publicProcedure
    .input(courseRequestIdSchema)
    .mutation(async ({ input }) => {
      return deleteCourseRequest(input.id);
    }),
});
