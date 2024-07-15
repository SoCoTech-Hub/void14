import PostList from "@/components/posts/PostList";
import NewPostModal from "@/components/posts/PostModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function Posts() {
  await checkAuth();
  const { posts } = await api.posts.getPosts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Posts</h1>
        <NewPostModal />
      </div>
      <PostList posts={posts} />
    </main>
  );
}
