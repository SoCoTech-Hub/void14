import QtypeDdimageortextList from "@/components/qtypeDdimageortexts/QtypeDdimageortextList";
import NewQtypeDdimageortextModal from "@/components/qtypeDdimageortexts/QtypeDdimageortextModal";
import { api } from "@/lib/trpc/api";

export default async function QtypeDdimageortexts() {
  const { qtypeDdimageortexts } = await api.qtypeDdimageortexts.getQtypeDdimageortexts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Qtype Ddimageortexts</h1>
        <NewQtypeDdimageortextModal />
      </div>
      <QtypeDdimageortextList qtypeDdimageortexts={qtypeDdimageortexts} />
    </main>
  );
}
