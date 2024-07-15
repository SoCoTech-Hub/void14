import MessageUsersBlockedList from "@/components/messageUsersBlockeds/MessageUsersBlockedList";
import NewMessageUsersBlockedModal from "@/components/messageUsersBlockeds/MessageUsersBlockedModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function MessageUsersBlockeds() {
  await checkAuth();
  const { messageUsersBlockeds } = await api.messageUsersBlockeds.getMessageUsersBlockeds.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Message Users Blockeds</h1>
        <NewMessageUsersBlockedModal />
      </div>
      <MessageUsersBlockedList messageUsersBlockeds={messageUsersBlockeds} />
    </main>
  );
}
