import { db } from "@soco/blog-db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type SocialReactionId, socialReactionIdSchema, socialReactions } from "@soco/blog-db/schema/socialReactions";
import { blogs } from "@soco/blog-db/schema/blogs";
import { socialIcons } from "@soco/blog-db/schema/socialIcons";

export const getSocialReactions = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ socialReaction: socialReactions, blog: blogs, socialIcon: socialIcons }).from(socialReactions).leftJoin(blogs, eq(socialReactions.blogId, blogs.id)).leftJoin(socialIcons, eq(socialReactions.socialIconId, socialIcons.id)).where(eq(socialReactions.userId, session?.user.id!));
  const s = rows .map((r) => ({ ...r.socialReaction, blog: r.blog, socialIcon: r.socialIcon})); 
  return { socialReactions: s };
};

export const getSocialReactionById = async (id: SocialReactionId) => {
  const { session } = await getUserAuth();
  const { id: socialReactionId } = socialReactionIdSchema.parse({ id });
  const [row] = await db.select({ socialReaction: socialReactions, blog: blogs, socialIcon: socialIcons }).from(socialReactions).where(and(eq(socialReactions.id, socialReactionId), eq(socialReactions.userId, session?.user.id!))).leftJoin(blogs, eq(socialReactions.blogId, blogs.id)).leftJoin(socialIcons, eq(socialReactions.socialIconId, socialIcons.id));
  if (row === undefined) return {};
  const s =  { ...row.socialReaction, blog: row.blog, socialIcon: row.socialIcon } ;
  return { socialReaction: s };
};


