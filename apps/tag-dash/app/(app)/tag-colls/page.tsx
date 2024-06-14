import TagCollList from "@/components/tagColls/TagCollList";
import NewTagCollModal from "@/components/tagColls/TagCollModal";
import { api } from "@/lib/trpc/api";

export default async function TagColls() {
  const { tagColls } = await api.tagColls.getTagColls.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tag Colls</h1>
        <NewTagCollModal />
      </div>
      <TagCollList tagColls={tagColls} />
    </main>
  );
}
