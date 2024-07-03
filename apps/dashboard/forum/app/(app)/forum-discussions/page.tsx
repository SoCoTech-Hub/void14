import ForumDiscussionList from "@/components/forumDiscussions/ForumDiscussionList";
import NewForumDiscussionModal from "@/components/forumDiscussions/ForumDiscussionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ForumDiscussions() {
  await checkAuth();
  const { forumDiscussions } = await api.forumDiscussions.getForumDiscussions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Forum Discussions</h1>
        <NewForumDiscussionModal />
      </div>
      <ForumDiscussionList forumDiscussions={forumDiscussions} />
    </main>
  );
}
