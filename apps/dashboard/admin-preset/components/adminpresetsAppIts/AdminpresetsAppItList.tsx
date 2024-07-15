"use client";
import { CompleteAdminpresetsAppIt } from "@soco/admin-preset-db/schema/adminpresetsAppIts";
import { trpc } from "@/lib/trpc/client";
import AdminpresetsAppItModal from "./AdminpresetsAppItModal";


export default function AdminpresetsAppItList({ adminpresetsAppIts }: { adminpresetsAppIts: CompleteAdminpresetsAppIt[] }) {
  const { data: a } = trpc.adminpresetsAppIts.getAdminpresetsAppIts.useQuery(undefined, {
    initialData: { adminpresetsAppIts },
    refetchOnMount: false,
  });

  if (a.adminpresetsAppIts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.adminpresetsAppIts.map((adminpresetsAppIt) => (
        <AdminpresetsAppIt adminpresetsAppIt={adminpresetsAppIt} key={adminpresetsAppIt.adminpresetsAppIt.id} />
      ))}
    </ul>
  );
}

const AdminpresetsAppIt = ({ adminpresetsAppIt }: { adminpresetsAppIt: CompleteAdminpresetsAppIt }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{adminpresetsAppIt.adminpresetsAppIt.adminPresetsAppId}</div>
      </div>
      <AdminpresetsAppItModal adminpresetsAppIt={adminpresetsAppIt.adminpresetsAppIt} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No adminpresets app its
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new adminpresets app it.
      </p>
      <div className="mt-6">
        <AdminpresetsAppItModal emptyState={true} />
      </div>
    </div>
  );
};

