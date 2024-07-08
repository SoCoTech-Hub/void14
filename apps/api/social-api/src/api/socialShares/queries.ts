import { db } from "@soco/social-db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type SocialShareId, socialShareIdSchema, socialShares } from "@soco/social-db/schema/socialShares";
import { socialLinks } from "@soco/social-db/schema/socialLinks";

export const getSocialShares = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ socialShare: socialShares, socialLink: socialLinks }).from(socialShares).leftJoin(socialLinks, eq(socialShares.socialLinkId, socialLinks.id)).where(eq(socialShares.userId, session?.user.id!));
  const s = rows .map((r) => ({ ...r.socialShare, socialLink: r.socialLink})); 
  return { socialShares: s };
};

export const getSocialShareById = async (id: SocialShareId) => {
  const { session } = await getUserAuth();
  const { id: socialShareId } = socialShareIdSchema.parse({ id });
  const [row] = await db.select({ socialShare: socialShares, socialLink: socialLinks }).from(socialShares).where(and(eq(socialShares.id, socialShareId), eq(socialShares.userId, session?.user.id!))).leftJoin(socialLinks, eq(socialShares.socialLinkId, socialLinks.id));
  if (row === undefined) return {};
  const s =  { ...row.socialShare, socialLink: row.socialLink } ;
  return { socialShare: s };
};


