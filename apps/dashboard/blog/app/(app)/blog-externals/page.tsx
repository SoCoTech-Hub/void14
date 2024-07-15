import BlogExternalList from "@/components/blogExternals/BlogExternalList";
import NewBlogExternalModal from "@/components/blogExternals/BlogExternalModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function BlogExternals() {
  await checkAuth();
  const { blogExternals } = await api.blogExternals.getBlogExternals.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Blog Externals</h1>
        <NewBlogExternalModal />
      </div>
      <BlogExternalList blogExternals={blogExternals} />
    </main>
  );
}
