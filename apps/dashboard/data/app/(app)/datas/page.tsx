import DataList from "@/components/datas/DataList";
import NewDataModal from "@/components/datas/DataModal";
import { api } from "@/lib/trpc/api";

export default async function Datas() {
  const { datas } = await api.datas.getDatas.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Datas</h1>
        <NewDataModal />
      </div>
      <DataList datas={datas} />
    </main>
  );
}
