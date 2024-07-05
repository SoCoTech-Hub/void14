import { eq } from "drizzle-orm";

import type { BadgeEndorsementId } from "../../db/schema/badgeEndorsements";
import { db } from "../../db/index";
import {
  badgeEndorsementIdSchema,
  badgeEndorsements,
} from "../../db/schema/badgeEndorsements";
import { badges } from "../../db/schema/badges";

export const getBadgeEndorsements = async () => {
  const rows = await db
    .select({ badgeEndorsement: badgeEndorsements, badge: badges })
    .from(badgeEndorsements)
    .leftJoin(badges, eq(badgeEndorsements.badgeId, badges.id));
  const b = rows.map((r) => ({ ...r.badgeEndorsement, badge: r.badge }));
  return { badgeEndorsements: b };
};

export const getBadgeEndorsementById = async (id: BadgeEndorsementId) => {
  const { id: badgeEndorsementId } = badgeEndorsementIdSchema.parse({ id });
  const [row] = await db
    .select({ badgeEndorsement: badgeEndorsements, badge: badges })
    .from(badgeEndorsements)
    .where(eq(badgeEndorsements.id, badgeEndorsementId))
    .leftJoin(badges, eq(badgeEndorsements.badgeId, badges.id));
  if (row === undefined) return {};
  const b = { ...row.badgeEndorsement, badge: row.badge };
  return { badgeEndorsement: b };
};
