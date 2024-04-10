import BlogCommentList from "@/components/blogComments/BlogCommentList";
import NewBlogCommentModal from "@/components/blogComments/BlogCommentModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function BlogComments() {
  await checkAuth();
  const { blogComments } = await api.blogComments.getBlogComments.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Blog Comments</h1>
        <NewBlogCommentModal />
      </div>
      <BlogCommentList blogComments={blogComments} />
    </main>
  );
}
