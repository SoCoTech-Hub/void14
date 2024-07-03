import MassMailListsRecipientList from "@/components/massMailListsRecipients/MassMailListsRecipientList";
import NewMassMailListsRecipientModal from "@/components/massMailListsRecipients/MassMailListsRecipientModal";
import { api } from "@/lib/trpc/api";

export default async function MassMailListsRecipients() {
  const { massMailListsRecipients } = await api.massMailListsRecipients.getMassMailListsRecipients.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Mass Mail Lists Recipients</h1>
        <NewMassMailListsRecipientModal />
      </div>
      <MassMailListsRecipientList massMailListsRecipients={massMailListsRecipients} />
    </main>
  );
}
