import QtypeDdmarkerDropList from "@/components/qtypeDdmarkerDrops/QtypeDdmarkerDropList";
import NewQtypeDdmarkerDropModal from "@/components/qtypeDdmarkerDrops/QtypeDdmarkerDropModal";
import { api } from "@/lib/trpc/api";

export default async function QtypeDdmarkerDrops() {
  const { qtypeDdmarkerDrops } = await api.qtypeDdmarkerDrops.getQtypeDdmarkerDrops.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Qtype Ddmarker Drops</h1>
        <NewQtypeDdmarkerDropModal />
      </div>
      <QtypeDdmarkerDropList qtypeDdmarkerDrops={qtypeDdmarkerDrops} />
    </main>
  );
}
