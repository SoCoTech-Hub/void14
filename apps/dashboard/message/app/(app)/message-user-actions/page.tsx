import MessageUserActionList from "@/components/messageUserActions/MessageUserActionList";
import NewMessageUserActionModal from "@/components/messageUserActions/MessageUserActionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function MessageUserActions() {
  await checkAuth();
  const { messageUserActions } = await api.messageUserActions.getMessageUserActions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Message User Actions</h1>
        <NewMessageUserActionModal />
      </div>
      <MessageUserActionList messageUserActions={messageUserActions} />
    </main>
  );
}
