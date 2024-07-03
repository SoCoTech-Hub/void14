import QtypeShortanswerOptionList from "@/components/qtypeShortanswerOptions/QtypeShortanswerOptionList";
import NewQtypeShortanswerOptionModal from "@/components/qtypeShortanswerOptions/QtypeShortanswerOptionModal";
import { api } from "@/lib/trpc/api";

export default async function QtypeShortanswerOptions() {
  const { qtypeShortanswerOptions } = await api.qtypeShortanswerOptions.getQtypeShortanswerOptions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Qtype Shortanswer Options</h1>
        <NewQtypeShortanswerOptionModal />
      </div>
      <QtypeShortanswerOptionList qtypeShortanswerOptions={qtypeShortanswerOptions} />
    </main>
  );
}
