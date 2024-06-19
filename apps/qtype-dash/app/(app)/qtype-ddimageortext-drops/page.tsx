import QtypeDdimageortextDropList from "@/components/qtypeDdimageortextDrops/QtypeDdimageortextDropList";
import NewQtypeDdimageortextDropModal from "@/components/qtypeDdimageortextDrops/QtypeDdimageortextDropModal";
import { api } from "@/lib/trpc/api";

export default async function QtypeDdimageortextDrops() {
  const { qtypeDdimageortextDrops } = await api.qtypeDdimageortextDrops.getQtypeDdimageortextDrops.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Qtype Ddimageortext Drops</h1>
        <NewQtypeDdimageortextDropModal />
      </div>
      <QtypeDdimageortextDropList qtypeDdimageortextDrops={qtypeDdimageortextDrops} />
    </main>
  );
}
