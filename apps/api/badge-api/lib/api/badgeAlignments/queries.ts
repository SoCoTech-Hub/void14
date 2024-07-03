import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type BadgeAlignmentId, badgeAlignmentIdSchema, badgeAlignments } from "@/lib/db/schema/badgeAlignments";
import { badges } from "@/lib/db/schema/badges";

export const getBadgeAlignments = async () => {
  const rows = await db.select({ badgeAlignment: badgeAlignments, badge: badges }).from(badgeAlignments).leftJoin(badges, eq(badgeAlignments.badgeId, badges.id));
  const b = rows .map((r) => ({ ...r.badgeAlignment, badge: r.badge})); 
  return { badgeAlignments: b };
};

export const getBadgeAlignmentById = async (id: BadgeAlignmentId) => {
  const { id: badgeAlignmentId } = badgeAlignmentIdSchema.parse({ id });
  const [row] = await db.select({ badgeAlignment: badgeAlignments, badge: badges }).from(badgeAlignments).where(eq(badgeAlignments.id, badgeAlignmentId)).leftJoin(badges, eq(badgeAlignments.badgeId, badges.id));
  if (row === undefined) return {};
  const b =  { ...row.badgeAlignment, badge: row.badge } ;
  return { badgeAlignment: b };
};


