import MessagePopupNotificationList from "@/components/messagePopupNotifications/MessagePopupNotificationList";
import NewMessagePopupNotificationModal from "@/components/messagePopupNotifications/MessagePopupNotificationModal";
import { api } from "@/lib/trpc/api";

export default async function MessagePopupNotifications() {
  const { messagePopupNotifications } = await api.messagePopupNotifications.getMessagePopupNotifications.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Message Popup Notifications</h1>
        <NewMessagePopupNotificationModal />
      </div>
      <MessagePopupNotificationList messagePopupNotifications={messagePopupNotifications} />
    </main>
  );
}
