"use client";
import { CompleteUserLastAccess } from "@/lib/db/schema/userLastAccesses";
import { trpc } from "@/lib/trpc/client";
import UserLastAccessModal from "./UserLastAccessModal";


export default function UserLastAccessList({ userLastAccesses }: { userLastAccesses: CompleteUserLastAccess[] }) {
  const { data: u } = trpc.userLastAccesses.getUserLastAccesses.useQuery(undefined, {
    initialData: { userLastAccesses },
    refetchOnMount: false,
  });

  if (u.userLastAccesses.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {u.userLastAccesses.map((userLastAccess) => (
        <UserLastAccess userLastAccess={userLastAccess} key={userLastAccess.id} />
      ))}
    </ul>
  );
}

const UserLastAccess = ({ userLastAccess }: { userLastAccess: CompleteUserLastAccess }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{userLastAccess.courseId}</div>
      </div>
      <UserLastAccessModal userLastAccess={userLastAccess} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No user last accesses
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new user last access.
      </p>
      <div className="mt-6">
        <UserLastAccessModal emptyState={true} />
      </div>
    </div>
  );
};

