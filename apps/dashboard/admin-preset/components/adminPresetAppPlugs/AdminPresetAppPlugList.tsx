"use client";

import { trpc } from "@/lib/trpc/client";

// import type { getAdminPresetAppPlugs } from "@soco/admin-preset-api/root/";

import AdminPresetAppPlugModal from "./AdminPresetAppPlugModal";

export default function AdminPresetAppPlugList({
  adminPresetAppPlugs,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  adminPresetAppPlugs: any;
}) {
  const { data: a } = trpc.adminPresetAppPlugs.getAdminPresetAppPlugs.useQuery(
    undefined,
    {
      initialData: { adminPresetAppPlugs },
      refetchOnMount: false,
    },
  );

  if (a.adminPresetAppPlugs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.adminPresetAppPlugs.map((adminPresetAppPlug) => (
        <AdminPresetAppPlug
          adminPresetAppPlug={adminPresetAppPlug}
          key={adminPresetAppPlug.id}
        />
      ))}
    </ul>
  );
}

const AdminPresetAppPlug = ({
  adminPresetAppPlug,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  adminPresetAppPlug: any;
}) => {
  return (
    <li className="my-2 flex justify-between">
      <div className="w-full">
        <div>{adminPresetAppPlug.adminPresetAppPlug.name}</div>
      </div>
      <AdminPresetAppPlugModal
        adminPresetAppPlug={adminPresetAppPlug.adminPresetAppPlug}
      />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="text-secondary-foreground mt-2 text-sm font-semibold">
        No admin preset app plugins found
      </h3>
      <p className="text-muted-foreground mt-1 text-sm">
        Get started by creating a new admin preset app plugin.
      </p>
      <div className="mt-6">
        <AdminPresetAppPlugModal emptyState={true} />
      </div>
    </div>
  );
};
