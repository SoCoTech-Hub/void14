import QtypeMatchOptionList from "@/components/qtypeMatchOptions/QtypeMatchOptionList";
import NewQtypeMatchOptionModal from "@/components/qtypeMatchOptions/QtypeMatchOptionModal";
import { api } from "@/lib/trpc/api";

export default async function QtypeMatchOptions() {
  const { qtypeMatchOptions } = await api.qtypeMatchOptions.getQtypeMatchOptions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Qtype Match Options</h1>
        <NewQtypeMatchOptionModal />
      </div>
      <QtypeMatchOptionList qtypeMatchOptions={qtypeMatchOptions} />
    </main>
  );
}
