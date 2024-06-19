import MessageAirnotifierDeviceList from "@/components/messageAirnotifierDevices/MessageAirnotifierDeviceList";
import NewMessageAirnotifierDeviceModal from "@/components/messageAirnotifierDevices/MessageAirnotifierDeviceModal";
import { api } from "@/lib/trpc/api";

export default async function MessageAirnotifierDevices() {
  const { messageAirnotifierDevices } = await api.messageAirnotifierDevices.getMessageAirnotifierDevices.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Message Airnotifier Devices</h1>
        <NewMessageAirnotifierDeviceModal />
      </div>
      <MessageAirnotifierDeviceList messageAirnotifierDevices={messageAirnotifierDevices} />
    </main>
  );
}
