import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { ForumTrackPrefId } from "../../db/schema/forumTrackPrefs";
import { db } from "../../db/index";
import { forums } from "../../db/schema/forums";
import {
  forumTrackPrefIdSchema,
  forumTrackPrefs,
} from "../../db/schema/forumTrackPrefs";

export const getForumTrackPrefs = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ forumTrackPref: forumTrackPrefs, forum: forums })
    .from(forumTrackPrefs)
    .leftJoin(forums, eq(forumTrackPrefs.forumId, forums.id))
    .where(eq(forumTrackPrefs.userId, session?.user.id!));
  const f = rows.map((r) => ({ ...r.forumTrackPref, forum: r.forum }));
  return { forumTrackPrefs: f };
};

export const getForumTrackPrefById = async (id: ForumTrackPrefId) => {
  const { session } = await getUserAuth();
  const { id: forumTrackPrefId } = forumTrackPrefIdSchema.parse({ id });
  const [row] = await db
    .select({ forumTrackPref: forumTrackPrefs, forum: forums })
    .from(forumTrackPrefs)
    .where(
      and(
        eq(forumTrackPrefs.id, forumTrackPrefId),
        eq(forumTrackPrefs.userId, session?.user.id!),
      ),
    )
    .leftJoin(forums, eq(forumTrackPrefs.forumId, forums.id));
  if (row === undefined) return {};
  const f = { ...row.forumTrackPref, forum: row.forum };
  return { forumTrackPref: f };
};
