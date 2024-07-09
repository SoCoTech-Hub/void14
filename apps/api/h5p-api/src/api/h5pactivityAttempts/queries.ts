import { and, eq } from "drizzle-orm";

import type { H5pactivityAttemptId } from "@soco/h5p-db/schema/h5pactivityAttempts";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/h5p-db/index";
import {
  h5pactivityAttemptIdSchema,
  h5pactivityAttempts,
} from "@soco/h5p-db/schema/h5pactivityAttempts";

export const getH5pactivityAttempts = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(h5pactivityAttempts)
    .where(eq(h5pactivityAttempts.userId, session?.user.id!));
  const h = rows;
  return { h5pactivityAttempts: h };
};

export const getH5pactivityAttemptById = async (id: H5pactivityAttemptId) => {
  const { session } = await getUserAuth();
  const { id: h5pactivityAttemptId } = h5pactivityAttemptIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(h5pactivityAttempts)
    .where(
      and(
        eq(h5pactivityAttempts.id, h5pactivityAttemptId),
        eq(h5pactivityAttempts.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const h = row;
  return { h5pactivityAttempt: h };
};
