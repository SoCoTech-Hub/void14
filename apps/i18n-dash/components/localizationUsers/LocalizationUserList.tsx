"use client";
import { CompleteLocalizationUser } from "@/lib/db/schema/localizationUsers";
import { trpc } from "@/lib/trpc/client";
import LocalizationUserModal from "./LocalizationUserModal";


export default function LocalizationUserList({ localizationUsers }: { localizationUsers: CompleteLocalizationUser[] }) {
  const { data: l } = trpc.localizationUsers.getLocalizationUsers.useQuery(undefined, {
    initialData: { localizationUsers },
    refetchOnMount: false,
  });

  if (l.localizationUsers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.localizationUsers.map((localizationUser) => (
        <LocalizationUser localizationUser={localizationUser} key={localizationUser.localizationUser.id} />
      ))}
    </ul>
  );
}

const LocalizationUser = ({ localizationUser }: { localizationUser: CompleteLocalizationUser }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{localizationUser.localizationUser.localizationLanguageId}</div>
      </div>
      <LocalizationUserModal localizationUser={localizationUser.localizationUser} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No localization users
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new localization user.
      </p>
      <div className="mt-6">
        <LocalizationUserModal emptyState={true} />
      </div>
    </div>
  );
};

