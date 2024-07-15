"use client";
import { CompleteUserPasswordHistory } from "@soco/user-db/schema/userPasswordHistories";
import { trpc } from "@/lib/trpc/client";
import UserPasswordHistoryModal from "./UserPasswordHistoryModal";


export default function UserPasswordHistoryList({ userPasswordHistories }: { userPasswordHistories: CompleteUserPasswordHistory[] }) {
  const { data: u } = trpc.userPasswordHistories.getUserPasswordHistories.useQuery(undefined, {
    initialData: { userPasswordHistories },
    refetchOnMount: false,
  });

  if (u.userPasswordHistories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {u.userPasswordHistories.map((userPasswordHistory) => (
        <UserPasswordHistory userPasswordHistory={userPasswordHistory} key={userPasswordHistory.id} />
      ))}
    </ul>
  );
}

const UserPasswordHistory = ({ userPasswordHistory }: { userPasswordHistory: CompleteUserPasswordHistory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{userPasswordHistory.hash}</div>
      </div>
      <UserPasswordHistoryModal userPasswordHistory={userPasswordHistory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No user password histories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new user password history.
      </p>
      <div className="mt-6">
        <UserPasswordHistoryModal emptyState={true} />
      </div>
    </div>
  );
};

