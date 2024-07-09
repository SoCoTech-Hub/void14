import { and, eq } from "drizzle-orm";

import type { EnrolLtiUserId } from "@soco/enrol-db/schema/enrolLtiUsers";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/enrol-db/index";
import { enrolLtiDeployments } from "@soco/enrol-db/schema/enrolLtiDeployments";
import {
  enrolLtiUserIdSchema,
  enrolLtiUsers,
} from "@soco/enrol-db/schema/enrolLtiUsers";

export const getEnrolLtiUsers = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      enrolLtiUser: enrolLtiUsers,
      enrolLtiDeployment: enrolLtiDeployments,
    })
    .from(enrolLtiUsers)
    .leftJoin(
      enrolLtiDeployments,
      eq(enrolLtiUsers.enrolLtiDeploymentId, enrolLtiDeployments.id),
    )
    .where(eq(enrolLtiUsers.userId, session?.user.id!));
  const e = rows.map((r) => ({
    ...r.enrolLtiUser,
    enrolLtiDeployment: r.enrolLtiDeployment,
  }));
  return { enrolLtiUsers: e };
};

export const getEnrolLtiUserById = async (id: EnrolLtiUserId) => {
  const { session } = await getUserAuth();
  const { id: enrolLtiUserId } = enrolLtiUserIdSchema.parse({ id });
  const [row] = await db
    .select({
      enrolLtiUser: enrolLtiUsers,
      enrolLtiDeployment: enrolLtiDeployments,
    })
    .from(enrolLtiUsers)
    .where(
      and(
        eq(enrolLtiUsers.id, enrolLtiUserId),
        eq(enrolLtiUsers.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      enrolLtiDeployments,
      eq(enrolLtiUsers.enrolLtiDeploymentId, enrolLtiDeployments.id),
    );
  if (row === undefined) return {};
  const e = { ...row.enrolLtiUser, enrolLtiDeployment: row.enrolLtiDeployment };
  return { enrolLtiUser: e };
};
