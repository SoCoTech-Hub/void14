"use client";
import { CompleteAdminPreset } from "@soco/admin-preset-db/schema/adminPresets";
import { trpc } from "@/lib/trpc/client";
import AdminPresetModal from "./AdminPresetModal";


export default function AdminPresetList({ adminPresets }: { adminPresets: CompleteAdminPreset[] }) {
  const { data: a } = trpc.adminPresets.getAdminPresets.useQuery(undefined, {
    initialData: { adminPresets },
    refetchOnMount: false,
  });

  if (a.adminPresets.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.adminPresets.map((adminPreset) => (
        <AdminPreset adminPreset={adminPreset} key={adminPreset.id} />
      ))}
    </ul>
  );
}

const AdminPreset = ({ adminPreset }: { adminPreset: CompleteAdminPreset }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{adminPreset.author}</div>
      </div>
      <AdminPresetModal adminPreset={adminPreset} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No admin presets
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new admin preset.
      </p>
      <div className="mt-6">
        <AdminPresetModal emptyState={true} />
      </div>
    </div>
  );
};

