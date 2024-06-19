import QtypeMultichoiceOptionList from "@/components/qtypeMultichoiceOptions/QtypeMultichoiceOptionList";
import NewQtypeMultichoiceOptionModal from "@/components/qtypeMultichoiceOptions/QtypeMultichoiceOptionModal";
import { api } from "@/lib/trpc/api";

export default async function QtypeMultichoiceOptions() {
  const { qtypeMultichoiceOptions } = await api.qtypeMultichoiceOptions.getQtypeMultichoiceOptions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Qtype Multichoice Options</h1>
        <NewQtypeMultichoiceOptionModal />
      </div>
      <QtypeMultichoiceOptionList qtypeMultichoiceOptions={qtypeMultichoiceOptions} />
    </main>
  );
}
