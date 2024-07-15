"use client";
import { CompleteAdminpresetsAppItA } from "@soco/admin-preset-db/schema/adminpresetsAppItAs";
import { trpc } from "@/lib/trpc/client";
import AdminpresetsAppItAModal from "./AdminpresetsAppItAModal";


export default function AdminpresetsAppItAList({ adminpresetsAppItAs }: { adminpresetsAppItAs: CompleteAdminpresetsAppItA[] }) {
  const { data: a } = trpc.adminpresetsAppItAs.getAdminpresetsAppItAs.useQuery(undefined, {
    initialData: { adminpresetsAppItAs },
    refetchOnMount: false,
  });

  if (a.adminpresetsAppItAs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.adminpresetsAppItAs.map((adminpresetsAppItA) => (
        <AdminpresetsAppItA adminpresetsAppItA={adminpresetsAppItA} key={adminpresetsAppItA.adminpresetsAppItA.id} />
      ))}
    </ul>
  );
}

const AdminpresetsAppItA = ({ adminpresetsAppItA }: { adminpresetsAppItA: CompleteAdminpresetsAppItA }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{adminpresetsAppItA.adminpresetsAppItA.name}</div>
      </div>
      <AdminpresetsAppItAModal adminpresetsAppItA={adminpresetsAppItA.adminpresetsAppItA} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No adminpresets app it as
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new adminpresets app it a.
      </p>
      <div className="mt-6">
        <AdminpresetsAppItAModal emptyState={true} />
      </div>
    </div>
  );
};

