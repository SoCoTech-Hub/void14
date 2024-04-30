import ChoiceList from "@/components/choices/ChoiceList";
import NewChoiceModal from "@/components/choices/ChoiceModal";
import { api } from "@/lib/trpc/api";

export default async function Choices() {
  const { choices } = await api.choices.getChoices.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Choices</h1>
        <NewChoiceModal />
      </div>
      <ChoiceList choices={choices} />
    </main>
  );
}
