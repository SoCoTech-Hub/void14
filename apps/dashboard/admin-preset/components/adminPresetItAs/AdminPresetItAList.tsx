"use client";
import { CompleteAdminPresetItA } from "@soco/admin-preset-db/schema/adminPresetItAs";
import { trpc } from "@/lib/trpc/client";
import AdminPresetItAModal from "./AdminPresetItAModal";


export default function AdminPresetItAList({ adminPresetItAs }: { adminPresetItAs: CompleteAdminPresetItA[] }) {
  const { data: a } = trpc.adminPresetItAs.getAdminPresetItAs.useQuery(undefined, {
    initialData: { adminPresetItAs },
    refetchOnMount: false,
  });

  if (a.adminPresetItAs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.adminPresetItAs.map((adminPresetItA) => (
        <AdminPresetItA adminPresetItA={adminPresetItA} key={adminPresetItA.id} />
      ))}
    </ul>
  );
}

const AdminPresetItA = ({ adminPresetItA }: { adminPresetItA: CompleteAdminPresetItA }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{adminPresetItA.itemId}</div>
      </div>
      <AdminPresetItAModal adminPresetItA={adminPresetItA} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No admin preset it as
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new admin preset it a.
      </p>
      <div className="mt-6">
        <AdminPresetItAModal emptyState={true} />
      </div>
    </div>
  );
};

