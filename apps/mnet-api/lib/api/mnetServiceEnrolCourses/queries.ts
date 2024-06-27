import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type MnetServiceEnrolCourseId, mnetServiceEnrolCourseIdSchema, mnetServiceEnrolCourses } from "@/lib/db/schema/mnetServiceEnrolCourses";
import { mnetHosts } from "@/lib/db/schema/mnetHosts";

export const getMnetServiceEnrolCourses = async () => {
  const rows = await db.select({ mnetServiceEnrolCourse: mnetServiceEnrolCourses, mnetHost: mnetHosts }).from(mnetServiceEnrolCourses).leftJoin(mnetHosts, eq(mnetServiceEnrolCourses.mnetHostId, mnetHosts.id));
  const m = rows .map((r) => ({ ...r.mnetServiceEnrolCourse, mnetHost: r.mnetHost})); 
  return { mnetServiceEnrolCourses: m };
};

export const getMnetServiceEnrolCourseById = async (id: MnetServiceEnrolCourseId) => {
  const { id: mnetServiceEnrolCourseId } = mnetServiceEnrolCourseIdSchema.parse({ id });
  const [row] = await db.select({ mnetServiceEnrolCourse: mnetServiceEnrolCourses, mnetHost: mnetHosts }).from(mnetServiceEnrolCourses).where(eq(mnetServiceEnrolCourses.id, mnetServiceEnrolCourseId)).leftJoin(mnetHosts, eq(mnetServiceEnrolCourses.mnetHostId, mnetHosts.id));
  if (row === undefined) return {};
  const m =  { ...row.mnetServiceEnrolCourse, mnetHost: row.mnetHost } ;
  return { mnetServiceEnrolCourse: m };
};


