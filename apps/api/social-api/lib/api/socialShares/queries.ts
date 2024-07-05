import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { SocialShareId } from "../../db/schema/socialShares";
import { db } from "../../db/index";
import { socialLinks } from "../../db/schema/socialLinks";
import {
  socialShareIdSchema,
  socialShares,
} from "../../db/schema/socialShares";

export const getSocialShares = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ socialShare: socialShares, socialLink: socialLinks })
    .from(socialShares)
    .leftJoin(socialLinks, eq(socialShares.socialLinkId, socialLinks.id))
    .where(eq(socialShares.userId, session?.user.id!));
  const s = rows.map((r) => ({ ...r.socialShare, socialLink: r.socialLink }));
  return { socialShares: s };
};

export const getSocialShareById = async (id: SocialShareId) => {
  const { session } = await getUserAuth();
  const { id: socialShareId } = socialShareIdSchema.parse({ id });
  const [row] = await db
    .select({ socialShare: socialShares, socialLink: socialLinks })
    .from(socialShares)
    .where(
      and(
        eq(socialShares.id, socialShareId),
        eq(socialShares.userId, session?.user.id!),
      ),
    )
    .leftJoin(socialLinks, eq(socialShares.socialLinkId, socialLinks.id));
  if (row === undefined) return {};
  const s = { ...row.socialShare, socialLink: row.socialLink };
  return { socialShare: s };
};
