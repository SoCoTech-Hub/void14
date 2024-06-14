import ScormScoesDataList from "@/components/scormScoesDatas/ScormScoesDataList";
import NewScormScoesDataModal from "@/components/scormScoesDatas/ScormScoesDataModal";
import { api } from "@/lib/trpc/api";

export default async function ScormScoesDatas() {
  const { scormScoesDatas } = await api.scormScoesDatas.getScormScoesDatas.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Scorm Scoes Datas</h1>
        <NewScormScoesDataModal />
      </div>
      <ScormScoesDataList scormScoesDatas={scormScoesDatas} />
    </main>
  );
}
