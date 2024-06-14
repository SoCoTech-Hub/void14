import TagAreaList from "@/components/tagAreas/TagAreaList";
import NewTagAreaModal from "@/components/tagAreas/TagAreaModal";
import { api } from "@/lib/trpc/api";

export default async function TagAreas() {
  const { tagAreas } = await api.tagAreas.getTagAreas.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tag Areas</h1>
        <NewTagAreaModal />
      </div>
      <TagAreaList tagAreas={tagAreas} />
    </main>
  );
}
