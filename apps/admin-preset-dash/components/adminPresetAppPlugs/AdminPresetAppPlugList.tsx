"use client";
import { CompleteAdminPresetAppPlug } from "@/lib/db/schema/adminPresetAppPlugs";
import { trpc } from "@/lib/trpc/client";
import AdminPresetAppPlugModal from "./AdminPresetAppPlugModal";


export default function AdminPresetAppPlugList({ adminPresetAppPlugs }: { adminPresetAppPlugs: CompleteAdminPresetAppPlug[] }) {
  const { data: a } = trpc.adminPresetAppPlugs.getAdminPresetAppPlugs.useQuery(undefined, {
    initialData: { adminPresetAppPlugs },
    refetchOnMount: false,
  });

  if (a.adminPresetAppPlugs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.adminPresetAppPlugs.map((adminPresetAppPlug) => (
        <AdminPresetAppPlug adminPresetAppPlug={adminPresetAppPlug} key={adminPresetAppPlug.adminPresetAppPlug.id} />
      ))}
    </ul>
  );
}

const AdminPresetAppPlug = ({ adminPresetAppPlug }: { adminPresetAppPlug: CompleteAdminPresetAppPlug }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{adminPresetAppPlug.adminPresetAppPlug.name}</div>
      </div>
      <AdminPresetAppPlugModal adminPresetAppPlug={adminPresetAppPlug.adminPresetAppPlug} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No admin preset app plugs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new admin preset app plug.
      </p>
      <div className="mt-6">
        <AdminPresetAppPlugModal emptyState={true} />
      </div>
    </div>
  );
};

