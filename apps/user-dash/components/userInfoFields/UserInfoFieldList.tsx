"use client";
import { CompleteUserInfoField } from "@/lib/db/schema/userInfoFields";
import { trpc } from "@/lib/trpc/client";
import UserInfoFieldModal from "./UserInfoFieldModal";


export default function UserInfoFieldList({ userInfoFields }: { userInfoFields: CompleteUserInfoField[] }) {
  const { data: u } = trpc.userInfoFields.getUserInfoFields.useQuery(undefined, {
    initialData: { userInfoFields },
    refetchOnMount: false,
  });

  if (u.userInfoFields.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {u.userInfoFields.map((userInfoField) => (
        <UserInfoField userInfoField={userInfoField} key={userInfoField.id} />
      ))}
    </ul>
  );
}

const UserInfoField = ({ userInfoField }: { userInfoField: CompleteUserInfoField }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{userInfoField.categoryId}</div>
      </div>
      <UserInfoFieldModal userInfoField={userInfoField} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No user info fields
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new user info field.
      </p>
      <div className="mt-6">
        <UserInfoFieldModal emptyState={true} />
      </div>
    </div>
  );
};

