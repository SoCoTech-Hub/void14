"use client";
import { CompleteUserDevice } from "@/lib/db/schema/userDevices";
import { trpc } from "@/lib/trpc/client";
import UserDeviceModal from "./UserDeviceModal";


export default function UserDeviceList({ userDevices }: { userDevices: CompleteUserDevice[] }) {
  const { data: u } = trpc.userDevices.getUserDevices.useQuery(undefined, {
    initialData: { userDevices },
    refetchOnMount: false,
  });

  if (u.userDevices.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {u.userDevices.map((userDevice) => (
        <UserDevice userDevice={userDevice} key={userDevice.id} />
      ))}
    </ul>
  );
}

const UserDevice = ({ userDevice }: { userDevice: CompleteUserDevice }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{userDevice.appId}</div>
      </div>
      <UserDeviceModal userDevice={userDevice} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No user devices
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new user device.
      </p>
      <div className="mt-6">
        <UserDeviceModal emptyState={true} />
      </div>
    </div>
  );
};

