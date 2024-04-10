import BlogList from "@/components/blogs/BlogList";
import NewBlogModal from "@/components/blogs/BlogModal";
import { api } from "@/lib/trpc/api";

export default async function Blogs() {
  const { blogs } = await api.blogs.getBlogs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Blogs</h1>
        <NewBlogModal />
      </div>
      <BlogList blogs={blogs} />
    </main>
  );
}
