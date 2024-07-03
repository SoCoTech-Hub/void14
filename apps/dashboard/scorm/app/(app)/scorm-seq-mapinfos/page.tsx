import ScormSeqMapinfoList from "@/components/scormSeqMapinfos/ScormSeqMapinfoList";
import NewScormSeqMapinfoModal from "@/components/scormSeqMapinfos/ScormSeqMapinfoModal";
import { api } from "@/lib/trpc/api";

export default async function ScormSeqMapinfos() {
  const { scormSeqMapinfos } = await api.scormSeqMapinfos.getScormSeqMapinfos.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Scorm Seq Mapinfos</h1>
        <NewScormSeqMapinfoModal />
      </div>
      <ScormSeqMapinfoList scormSeqMapinfos={scormSeqMapinfos} />
    </main>
  );
}
