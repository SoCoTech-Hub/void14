import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { ToolDataprivacyRequestId } from "../db/schema/toolDataprivacyRequests";
import { db } from "../db/index";
import {
  toolDataprivacyRequestIdSchema,
  toolDataprivacyRequests,
} from "../db/schema/toolDataprivacyRequests";

export const getToolDataprivacyRequests = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(toolDataprivacyRequests)
    .where(eq(toolDataprivacyRequests.userId, session?.user.id!));
  const t = rows;
  return { toolDataprivacyRequests: t };
};

export const getToolDataprivacyRequestById = async (
  id: ToolDataprivacyRequestId,
) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyRequestId } = toolDataprivacyRequestIdSchema.parse(
    { id },
  );
  const [row] = await db
    .select()
    .from(toolDataprivacyRequests)
    .where(
      and(
        eq(toolDataprivacyRequests.id, toolDataprivacyRequestId),
        eq(toolDataprivacyRequests.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const t = row;
  return { toolDataprivacyRequest: t };
};
