import LabelList from "@/components/labels/LabelList";
import NewLabelModal from "@/components/labels/LabelModal";
import { api } from "@/lib/trpc/api";

export default async function Labels() {
  const { labels } = await api.labels.getLabels.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Labels</h1>
        <NewLabelModal />
      </div>
      <LabelList labels={labels} />
    </main>
  );
}
