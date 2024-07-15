import NotificationList from "@/components/notifications/NotificationList";
import NewNotificationModal from "@/components/notifications/NotificationModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function Notifications() {
  await checkAuth();
  const { notifications } = await api.notifications.getNotifications.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Notifications</h1>
        <NewNotificationModal />
      </div>
      <NotificationList notifications={notifications} />
    </main>
  );
}
