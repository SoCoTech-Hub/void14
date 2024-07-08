import { db } from "@soco/badge-db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type BadgeIssueId, badgeIssueIdSchema, badgeIssues } from "@soco/badge-db/schema/badgeIssues";
import { badges } from "@soco/badge-db/schema/badges";

export const getBadgeIssues = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ badgeIssue: badgeIssues, badge: badges }).from(badgeIssues).leftJoin(badges, eq(badgeIssues.badgeId, badges.id)).where(eq(badgeIssues.userId, session?.user.id!));
  const b = rows .map((r) => ({ ...r.badgeIssue, badge: r.badge})); 
  return { badgeIssues: b };
};

export const getBadgeIssueById = async (id: BadgeIssueId) => {
  const { session } = await getUserAuth();
  const { id: badgeIssueId } = badgeIssueIdSchema.parse({ id });
  const [row] = await db.select({ badgeIssue: badgeIssues, badge: badges }).from(badgeIssues).where(and(eq(badgeIssues.id, badgeIssueId), eq(badgeIssues.userId, session?.user.id!))).leftJoin(badges, eq(badgeIssues.badgeId, badges.id));
  if (row === undefined) return {};
  const b =  { ...row.badgeIssue, badge: row.badge } ;
  return { badgeIssue: b };
};


