"use client";
import { CompleteUserPrivateKey } from "@soco/user-db/schema/userPrivateKeys";
import { trpc } from "@/lib/trpc/client";
import UserPrivateKeyModal from "./UserPrivateKeyModal";


export default function UserPrivateKeyList({ userPrivateKeys }: { userPrivateKeys: CompleteUserPrivateKey[] }) {
  const { data: u } = trpc.userPrivateKeys.getUserPrivateKeys.useQuery(undefined, {
    initialData: { userPrivateKeys },
    refetchOnMount: false,
  });

  if (u.userPrivateKeys.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {u.userPrivateKeys.map((userPrivateKey) => (
        <UserPrivateKey userPrivateKey={userPrivateKey} key={userPrivateKey.id} />
      ))}
    </ul>
  );
}

const UserPrivateKey = ({ userPrivateKey }: { userPrivateKey: CompleteUserPrivateKey }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{userPrivateKey.script}</div>
      </div>
      <UserPrivateKeyModal userPrivateKey={userPrivateKey} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No user private keys
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new user private key.
      </p>
      <div className="mt-6">
        <UserPrivateKeyModal emptyState={true} />
      </div>
    </div>
  );
};

