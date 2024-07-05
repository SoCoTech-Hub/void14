import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { ToolCohortRoleId } from "../../db/schema/toolCohortRoles";
import { db } from "../../db/index";
import {
  toolCohortRoleIdSchema,
  toolCohortRoles,
} from "../../db/schema/toolCohortRoles";

export const getToolCohortRoles = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(toolCohortRoles)
    .where(eq(toolCohortRoles.userId, session?.user.id!));
  const t = rows;
  return { toolCohortRoles: t };
};

export const getToolCohortRoleById = async (id: ToolCohortRoleId) => {
  const { session } = await getUserAuth();
  const { id: toolCohortRoleId } = toolCohortRoleIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(toolCohortRoles)
    .where(
      and(
        eq(toolCohortRoles.id, toolCohortRoleId),
        eq(toolCohortRoles.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const t = row;
  return { toolCohortRole: t };
};
