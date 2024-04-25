import BlogAssociationList from "@/components/blogAssociations/BlogAssociationList";
import NewBlogAssociationModal from "@/components/blogAssociations/BlogAssociationModal";
import { api } from "@/lib/trpc/api";

export default async function BlogAssociations() {
  const { blogAssociations } = await api.blogAssociations.getBlogAssociations.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Blog Associations</h1>
        <NewBlogAssociationModal />
      </div>
      <BlogAssociationList blogAssociations={blogAssociations} />
    </main>
  );
}
