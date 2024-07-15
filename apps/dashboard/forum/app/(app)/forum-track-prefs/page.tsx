import ForumTrackPrefList from "@/components/forumTrackPrefs/ForumTrackPrefList";
import NewForumTrackPrefModal from "@/components/forumTrackPrefs/ForumTrackPrefModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ForumTrackPrefs() {
  await checkAuth();
  const { forumTrackPrefs } = await api.forumTrackPrefs.getForumTrackPrefs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Forum Track Prefs</h1>
        <NewForumTrackPrefModal />
      </div>
      <ForumTrackPrefList forumTrackPrefs={forumTrackPrefs} />
    </main>
  );
}
