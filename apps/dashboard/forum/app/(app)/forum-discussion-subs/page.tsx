import ForumDiscussionSubList from "@/components/forumDiscussionSubs/ForumDiscussionSubList";
import NewForumDiscussionSubModal from "@/components/forumDiscussionSubs/ForumDiscussionSubModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ForumDiscussionSubs() {
  await checkAuth();
  const { forumDiscussionSubs } = await api.forumDiscussionSubs.getForumDiscussionSubs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Forum Discussion Subs</h1>
        <NewForumDiscussionSubModal />
      </div>
      <ForumDiscussionSubList forumDiscussionSubs={forumDiscussionSubs} />
    </main>
  );
}
