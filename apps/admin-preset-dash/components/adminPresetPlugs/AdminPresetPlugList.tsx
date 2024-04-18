"use client";
import { CompleteAdminPresetPlug } from "@/lib/db/schema/adminPresetPlugs";
import { trpc } from "@/lib/trpc/client";
import AdminPresetPlugModal from "./AdminPresetPlugModal";


export default function AdminPresetPlugList({ adminPresetPlugs }: { adminPresetPlugs: CompleteAdminPresetPlug[] }) {
  const { data: a } = trpc.adminPresetPlugs.getAdminPresetPlugs.useQuery(undefined, {
    initialData: { adminPresetPlugs },
    refetchOnMount: false,
  });

  if (a.adminPresetPlugs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.adminPresetPlugs.map((adminPresetPlug) => (
        <AdminPresetPlug adminPresetPlug={adminPresetPlug} key={adminPresetPlug.adminPresetPlug.id} />
      ))}
    </ul>
  );
}

const AdminPresetPlug = ({ adminPresetPlug }: { adminPresetPlug: CompleteAdminPresetPlug }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{adminPresetPlug.adminPresetPlug.adminPresetId}</div>
      </div>
      <AdminPresetPlugModal adminPresetPlug={adminPresetPlug.adminPresetPlug} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No admin preset plugs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new admin preset plug.
      </p>
      <div className="mt-6">
        <AdminPresetPlugModal emptyState={true} />
      </div>
    </div>
  );
};

