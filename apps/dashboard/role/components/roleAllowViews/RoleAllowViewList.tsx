"use client";
import { CompleteRoleAllowView } from "@/lib/db/schema/roleAllowViews";
import { trpc } from "@/lib/trpc/client";
import RoleAllowViewModal from "./RoleAllowViewModal";


export default function RoleAllowViewList({ roleAllowViews }: { roleAllowViews: CompleteRoleAllowView[] }) {
  const { data: r } = trpc.roleAllowViews.getRoleAllowViews.useQuery(undefined, {
    initialData: { roleAllowViews },
    refetchOnMount: false,
  });

  if (r.roleAllowViews.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.roleAllowViews.map((roleAllowView) => (
        <RoleAllowView roleAllowView={roleAllowView} key={roleAllowView.roleAllowView.id} />
      ))}
    </ul>
  );
}

const RoleAllowView = ({ roleAllowView }: { roleAllowView: CompleteRoleAllowView }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{roleAllowView.roleAllowView.roleId}</div>
      </div>
      <RoleAllowViewModal roleAllowView={roleAllowView.roleAllowView} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No role allow views
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new role allow view.
      </p>
      <div className="mt-6">
        <RoleAllowViewModal emptyState={true} />
      </div>
    </div>
  );
};

