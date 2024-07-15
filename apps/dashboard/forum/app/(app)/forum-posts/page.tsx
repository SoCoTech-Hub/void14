import ForumPostList from "@/components/forumPosts/ForumPostList";
import NewForumPostModal from "@/components/forumPosts/ForumPostModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ForumPosts() {
  await checkAuth();
  const { forumPosts } = await api.forumPosts.getForumPosts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Forum Posts</h1>
        <NewForumPostModal />
      </div>
      <ForumPostList forumPosts={forumPosts} />
    </main>
  );
}
