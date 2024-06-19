import QtypeRandomsamatchOptionList from "@/components/qtypeRandomsamatchOptions/QtypeRandomsamatchOptionList";
import NewQtypeRandomsamatchOptionModal from "@/components/qtypeRandomsamatchOptions/QtypeRandomsamatchOptionModal";
import { api } from "@/lib/trpc/api";

export default async function QtypeRandomsamatchOptions() {
  const { qtypeRandomsamatchOptions } = await api.qtypeRandomsamatchOptions.getQtypeRandomsamatchOptions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Qtype Randomsamatch Options</h1>
        <NewQtypeRandomsamatchOptionModal />
      </div>
      <QtypeRandomsamatchOptionList qtypeRandomsamatchOptions={qtypeRandomsamatchOptions} />
    </main>
  );
}
