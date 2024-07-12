import type { MnetServiceEnrolEnrolmentId } from "@soco/mnet-db/schema/mnetServiceEnrolEnrolments";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/mnet-db";
import { db } from "@soco/mnet-db/client";
import { mnetHosts } from "@soco/mnet-db/schema/mnetHosts";
import {
  mnetServiceEnrolEnrolmentIdSchema,
  mnetServiceEnrolEnrolments,
} from "@soco/mnet-db/schema/mnetServiceEnrolEnrolments";

export const getMnetServiceEnrolEnrolments = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      mnetServiceEnrolEnrolment: mnetServiceEnrolEnrolments,
      mnetHost: mnetHosts,
    })
    .from(mnetServiceEnrolEnrolments)
    .leftJoin(
      mnetHosts,
      eq(mnetServiceEnrolEnrolments.mnetHostId, mnetHosts.id),
    )
    .where(eq(mnetServiceEnrolEnrolments.userId, session?.user.id!));
  const m = rows.map((r) => ({
    ...r.mnetServiceEnrolEnrolment,
    mnetHost: r.mnetHost,
  }));
  return { mnetServiceEnrolEnrolments: m };
};

export const getMnetServiceEnrolEnrolmentById = async (
  id: MnetServiceEnrolEnrolmentId,
) => {
  const { session } = await getUserAuth();
  const { id: mnetServiceEnrolEnrolmentId } =
    mnetServiceEnrolEnrolmentIdSchema.parse({ id });
  const [row] = await db
    .select({
      mnetServiceEnrolEnrolment: mnetServiceEnrolEnrolments,
      mnetHost: mnetHosts,
    })
    .from(mnetServiceEnrolEnrolments)
    .where(
      and(
        eq(mnetServiceEnrolEnrolments.id, mnetServiceEnrolEnrolmentId),
        eq(mnetServiceEnrolEnrolments.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      mnetHosts,
      eq(mnetServiceEnrolEnrolments.mnetHostId, mnetHosts.id),
    );
  if (row === undefined) return {};
  const m = { ...row.mnetServiceEnrolEnrolment, mnetHost: row.mnetHost };
  return { mnetServiceEnrolEnrolment: m };
};
