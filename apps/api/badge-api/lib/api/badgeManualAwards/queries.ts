import { eq } from "drizzle-orm";

import type { BadgeManualAwardId } from "../../db/schema/badgeManualAwards";
import { db } from "../../db/index";
import {
  badgeManualAwardIdSchema,
  badgeManualAwards,
} from "../../db/schema/badgeManualAwards";
import { badges } from "../../db/schema/badges";

export const getBadgeManualAwards = async () => {
  const rows = await db
    .select({ badgeManualAward: badgeManualAwards, badge: badges })
    .from(badgeManualAwards)
    .leftJoin(badges, eq(badgeManualAwards.badgeId, badges.id));
  const b = rows.map((r) => ({ ...r.badgeManualAward, badge: r.badge }));
  return { badgeManualAwards: b };
};

export const getBadgeManualAwardById = async (id: BadgeManualAwardId) => {
  const { id: badgeManualAwardId } = badgeManualAwardIdSchema.parse({ id });
  const [row] = await db
    .select({ badgeManualAward: badgeManualAwards, badge: badges })
    .from(badgeManualAwards)
    .where(eq(badgeManualAwards.id, badgeManualAwardId))
    .leftJoin(badges, eq(badgeManualAwards.badgeId, badges.id));
  if (row === undefined) return {};
  const b = { ...row.badgeManualAward, badge: row.badge };
  return { badgeManualAward: b };
};
