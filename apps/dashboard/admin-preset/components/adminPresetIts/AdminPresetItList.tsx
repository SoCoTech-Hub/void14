"use client";
import { CompleteAdminPresetIt } from "@soco/admin-preset-db/schema/adminPresetIts";
import { trpc } from "@/lib/trpc/client";
import AdminPresetItModal from "./AdminPresetItModal";


export default function AdminPresetItList({ adminPresetIts }: { adminPresetIts: CompleteAdminPresetIt[] }) {
  const { data: a } = trpc.adminPresetIts.getAdminPresetIts.useQuery(undefined, {
    initialData: { adminPresetIts },
    refetchOnMount: false,
  });

  if (a.adminPresetIts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.adminPresetIts.map((adminPresetIt) => (
        <AdminPresetIt adminPresetIt={adminPresetIt} key={adminPresetIt.adminPresetIt.id} />
      ))}
    </ul>
  );
}

const AdminPresetIt = ({ adminPresetIt }: { adminPresetIt: CompleteAdminPresetIt }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{adminPresetIt.adminPresetIt.name}</div>
      </div>
      <AdminPresetItModal adminPresetIt={adminPresetIt.adminPresetIt} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No admin preset its
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new admin preset it.
      </p>
      <div className="mt-6">
        <AdminPresetItModal emptyState={true} />
      </div>
    </div>
  );
};

