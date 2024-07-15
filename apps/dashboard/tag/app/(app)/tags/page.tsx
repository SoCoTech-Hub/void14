import TagList from "@/components/tags/TagList";
import NewTagModal from "@/components/tags/TagModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function Tags() {
  await checkAuth();
  const { tags } = await api.tags.getTags.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tags</h1>
        <NewTagModal />
      </div>
      <TagList tags={tags} />
    </main>
  );
}
