"use client";
import { CompleteMessageAirnotifierDevice } from "@/lib/db/schema/messageAirnotifierDevices";
import { trpc } from "@/lib/trpc/client";
import MessageAirnotifierDeviceModal from "./MessageAirnotifierDeviceModal";


export default function MessageAirnotifierDeviceList({ messageAirnotifierDevices }: { messageAirnotifierDevices: CompleteMessageAirnotifierDevice[] }) {
  const { data: m } = trpc.messageAirnotifierDevices.getMessageAirnotifierDevices.useQuery(undefined, {
    initialData: { messageAirnotifierDevices },
    refetchOnMount: false,
  });

  if (m.messageAirnotifierDevices.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messageAirnotifierDevices.map((messageAirnotifierDevice) => (
        <MessageAirnotifierDevice messageAirnotifierDevice={messageAirnotifierDevice} key={messageAirnotifierDevice.id} />
      ))}
    </ul>
  );
}

const MessageAirnotifierDevice = ({ messageAirnotifierDevice }: { messageAirnotifierDevice: CompleteMessageAirnotifierDevice }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{messageAirnotifierDevice.enable}</div>
      </div>
      <MessageAirnotifierDeviceModal messageAirnotifierDevice={messageAirnotifierDevice} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No message airnotifier devices
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new message airnotifier device.
      </p>
      <div className="mt-6">
        <MessageAirnotifierDeviceModal emptyState={true} />
      </div>
    </div>
  );
};

