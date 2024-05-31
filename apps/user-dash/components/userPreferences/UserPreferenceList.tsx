"use client";
import { CompleteUserPreference } from "@/lib/db/schema/userPreferences";
import { trpc } from "@/lib/trpc/client";
import UserPreferenceModal from "./UserPreferenceModal";


export default function UserPreferenceList({ userPreferences }: { userPreferences: CompleteUserPreference[] }) {
  const { data: u } = trpc.userPreferences.getUserPreferences.useQuery(undefined, {
    initialData: { userPreferences },
    refetchOnMount: false,
  });

  if (u.userPreferences.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {u.userPreferences.map((userPreference) => (
        <UserPreference userPreference={userPreference} key={userPreference.id} />
      ))}
    </ul>
  );
}

const UserPreference = ({ userPreference }: { userPreference: CompleteUserPreference }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{userPreference.name}</div>
      </div>
      <UserPreferenceModal userPreference={userPreference} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No user preferences
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new user preference.
      </p>
      <div className="mt-6">
        <UserPreferenceModal emptyState={true} />
      </div>
    </div>
  );
};

