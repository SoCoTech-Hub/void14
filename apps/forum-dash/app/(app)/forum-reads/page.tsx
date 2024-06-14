import ForumReadList from "@/components/forumReads/ForumReadList";
import NewForumReadModal from "@/components/forumReads/ForumReadModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ForumReads() {
  await checkAuth();
  const { forumReads } = await api.forumReads.getForumReads.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Forum Reads</h1>
        <NewForumReadModal />
      </div>
      <ForumReadList forumReads={forumReads} />
    </main>
  );
}
