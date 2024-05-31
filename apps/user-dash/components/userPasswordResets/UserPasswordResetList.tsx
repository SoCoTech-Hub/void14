"use client";
import { CompleteUserPasswordReset } from "@/lib/db/schema/userPasswordResets";
import { trpc } from "@/lib/trpc/client";
import UserPasswordResetModal from "./UserPasswordResetModal";


export default function UserPasswordResetList({ userPasswordResets }: { userPasswordResets: CompleteUserPasswordReset[] }) {
  const { data: u } = trpc.userPasswordResets.getUserPasswordResets.useQuery(undefined, {
    initialData: { userPasswordResets },
    refetchOnMount: false,
  });

  if (u.userPasswordResets.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {u.userPasswordResets.map((userPasswordReset) => (
        <UserPasswordReset userPasswordReset={userPasswordReset} key={userPasswordReset.id} />
      ))}
    </ul>
  );
}

const UserPasswordReset = ({ userPasswordReset }: { userPasswordReset: CompleteUserPasswordReset }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{userPasswordReset.token}</div>
      </div>
      <UserPasswordResetModal userPasswordReset={userPasswordReset} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No user password resets
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new user password reset.
      </p>
      <div className="mt-6">
        <UserPasswordResetModal emptyState={true} />
      </div>
    </div>
  );
};

