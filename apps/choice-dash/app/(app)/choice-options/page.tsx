import ChoiceOptionList from "@/components/choiceOptions/ChoiceOptionList";
import NewChoiceOptionModal from "@/components/choiceOptions/ChoiceOptionModal";
import { api } from "@/lib/trpc/api";

export default async function ChoiceOptions() {
  const { choiceOptions } = await api.choiceOptions.getChoiceOptions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Choice Options</h1>
        <NewChoiceOptionModal />
      </div>
      <ChoiceOptionList choiceOptions={choiceOptions} />
    </main>
  );
}
