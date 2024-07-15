import ForumDigestList from "@/components/forumDigests/ForumDigestList";
import NewForumDigestModal from "@/components/forumDigests/ForumDigestModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ForumDigests() {
  await checkAuth();
  const { forumDigests } = await api.forumDigests.getForumDigests.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Forum Digests</h1>
        <NewForumDigestModal />
      </div>
      <ForumDigestList forumDigests={forumDigests} />
    </main>
  );
}
