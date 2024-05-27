import DataContentList from "@/components/dataContents/DataContentList";
import NewDataContentModal from "@/components/dataContents/DataContentModal";
import { api } from "@/lib/trpc/api";

export default async function DataContents() {
  const { dataContents } = await api.dataContents.getDataContents.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Data Contents</h1>
        <NewDataContentModal />
      </div>
      <DataContentList dataContents={dataContents} />
    </main>
  );
}
