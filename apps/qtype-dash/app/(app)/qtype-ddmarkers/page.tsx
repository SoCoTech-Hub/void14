import QtypeDdmarkerList from "@/components/qtypeDdmarkers/QtypeDdmarkerList";
import NewQtypeDdmarkerModal from "@/components/qtypeDdmarkers/QtypeDdmarkerModal";
import { api } from "@/lib/trpc/api";

export default async function QtypeDdmarkers() {
  const { qtypeDdmarkers } = await api.qtypeDdmarkers.getQtypeDdmarkers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Qtype Ddmarkers</h1>
        <NewQtypeDdmarkerModal />
      </div>
      <QtypeDdmarkerList qtypeDdmarkers={qtypeDdmarkers} />
    </main>
  );
}
