import NotificationResponseList from "@/components/notificationResponses/NotificationResponseList";
import NewNotificationResponseModal from "@/components/notificationResponses/NotificationResponseModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function NotificationResponses() {
  await checkAuth();
  const { notificationResponses } = await api.notificationResponses.getNotificationResponses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Notification Responses</h1>
        <NewNotificationResponseModal />
      </div>
      <NotificationResponseList notificationResponses={notificationResponses} />
    </main>
  );
}
