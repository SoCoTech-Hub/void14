import type { BadgeEndorsementId } from "@soco/badge-db/schema/badgeEndorsements";
import { db, eq } from "@soco/badge-db";
import {
  badgeEndorsementIdSchema,
  badgeEndorsements,
} from "@soco/badge-db/schema/badgeEndorsements";
import { badges } from "@soco/badge-db/schema/badges";

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
