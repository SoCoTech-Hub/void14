import QtypeDdimageortextDragList from "@/components/qtypeDdimageortextDrags/QtypeDdimageortextDragList";
import NewQtypeDdimageortextDragModal from "@/components/qtypeDdimageortextDrags/QtypeDdimageortextDragModal";
import { api } from "@/lib/trpc/api";

export default async function QtypeDdimageortextDrags() {
  const { qtypeDdimageortextDrags } = await api.qtypeDdimageortextDrags.getQtypeDdimageortextDrags.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Qtype Ddimageortext Drags</h1>
        <NewQtypeDdimageortextDragModal />
      </div>
      <QtypeDdimageortextDragList qtypeDdimageortextDrags={qtypeDdimageortextDrags} />
    </main>
  );
}
