import UserDeviceList from "@/components/userDevices/UserDeviceList";
import NewUserDeviceModal from "@/components/userDevices/UserDeviceModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function UserDevices() {
  await checkAuth();
  const { userDevices } = await api.userDevices.getUserDevices.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">User Devices</h1>
        <NewUserDeviceModal />
      </div>
      <UserDeviceList userDevices={userDevices} />
    </main>
  );
}
