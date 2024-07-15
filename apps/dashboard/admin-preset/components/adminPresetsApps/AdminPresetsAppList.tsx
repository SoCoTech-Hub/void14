"use client";
import { CompleteAdminPresetsApp } from "@soco/admin-preset-db/schema/adminPresetsApps";
import { trpc } from "@/lib/trpc/client";
import AdminPresetsAppModal from "./AdminPresetsAppModal";


export default function AdminPresetsAppList({ adminPresetsApps }: { adminPresetsApps: CompleteAdminPresetsApp[] }) {
  const { data: a } = trpc.adminPresetsApps.getAdminPresetsApps.useQuery(undefined, {
    initialData: { adminPresetsApps },
    refetchOnMount: false,
  });

  if (a.adminPresetsApps.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.adminPresetsApps.map((adminPresetsApp) => (
        <AdminPresetsApp adminPresetsApp={adminPresetsApp} key={adminPresetsApp.adminPresetsApp.id} />
      ))}
    </ul>
  );
}

const AdminPresetsApp = ({ adminPresetsApp }: { adminPresetsApp: CompleteAdminPresetsApp }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{adminPresetsApp.adminPresetsApp.time.toString()}</div>
      </div>
      <AdminPresetsAppModal adminPresetsApp={adminPresetsApp.adminPresetsApp} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No admin presets apps
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new admin presets app.
      </p>
      <div className="mt-6">
        <AdminPresetsAppModal emptyState={true} />
      </div>
    </div>
  );
};

