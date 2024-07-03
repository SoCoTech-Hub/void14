import TagCorrelationList from "@/components/tagCorrelations/TagCorrelationList";
import NewTagCorrelationModal from "@/components/tagCorrelations/TagCorrelationModal";
import { api } from "@/lib/trpc/api";

export default async function TagCorrelations() {
  const { tagCorrelations } = await api.tagCorrelations.getTagCorrelations.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tag Correlations</h1>
        <NewTagCorrelationModal />
      </div>
      <TagCorrelationList tagCorrelations={tagCorrelations} />
    </main>
  );
}
