import QtypeDdmarkerDragList from "@/components/qtypeDdmarkerDrags/QtypeDdmarkerDragList";
import NewQtypeDdmarkerDragModal from "@/components/qtypeDdmarkerDrags/QtypeDdmarkerDragModal";
import { api } from "@/lib/trpc/api";

export default async function QtypeDdmarkerDrags() {
  const { qtypeDdmarkerDrags } = await api.qtypeDdmarkerDrags.getQtypeDdmarkerDrags.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Qtype Ddmarker Drags</h1>
        <NewQtypeDdmarkerDragModal />
      </div>
      <QtypeDdmarkerDragList qtypeDdmarkerDrags={qtypeDdmarkerDrags} />
    </main>
  );
}
