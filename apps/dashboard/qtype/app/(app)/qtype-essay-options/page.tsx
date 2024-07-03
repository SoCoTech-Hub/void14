import QtypeEssayOptionList from "@/components/qtypeEssayOptions/QtypeEssayOptionList";
import NewQtypeEssayOptionModal from "@/components/qtypeEssayOptions/QtypeEssayOptionModal";
import { api } from "@/lib/trpc/api";

export default async function QtypeEssayOptions() {
  const { qtypeEssayOptions } = await api.qtypeEssayOptions.getQtypeEssayOptions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Qtype Essay Options</h1>
        <NewQtypeEssayOptionModal />
      </div>
      <QtypeEssayOptionList qtypeEssayOptions={qtypeEssayOptions} />
    </main>
  );
}
