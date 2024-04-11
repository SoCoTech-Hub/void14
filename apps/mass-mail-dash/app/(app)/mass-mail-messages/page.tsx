import MassMailMessageList from "@/components/massMailMessages/MassMailMessageList";
import NewMassMailMessageModal from "@/components/massMailMessages/MassMailMessageModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function MassMailMessages() {
  await checkAuth();
  const { massMailMessages } = await api.massMailMessages.getMassMailMessages.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Mass Mail Messages</h1>
        <NewMassMailMessageModal />
      </div>
      <MassMailMessageList massMailMessages={massMailMessages} />
    </main>
  );
}
