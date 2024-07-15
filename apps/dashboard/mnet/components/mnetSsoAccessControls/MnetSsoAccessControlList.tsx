"use client";
import { CompleteMnetSsoAccessControl } from "@soco/mnet-db/schema/mnetSsoAccessControls";
import { trpc } from "@/lib/trpc/client";
import MnetSsoAccessControlModal from "./MnetSsoAccessControlModal";


export default function MnetSsoAccessControlList({ mnetSsoAccessControls }: { mnetSsoAccessControls: CompleteMnetSsoAccessControl[] }) {
  const { data: m } = trpc.mnetSsoAccessControls.getMnetSsoAccessControls.useQuery(undefined, {
    initialData: { mnetSsoAccessControls },
    refetchOnMount: false,
  });

  if (m.mnetSsoAccessControls.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.mnetSsoAccessControls.map((mnetSsoAccessControl) => (
        <MnetSsoAccessControl mnetSsoAccessControl={mnetSsoAccessControl} key={mnetSsoAccessControl.mnetSsoAccessControl.id} />
      ))}
    </ul>
  );
}

const MnetSsoAccessControl = ({ mnetSsoAccessControl }: { mnetSsoAccessControl: CompleteMnetSsoAccessControl }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{mnetSsoAccessControl.mnetSsoAccessControl.accessCtrl}</div>
      </div>
      <MnetSsoAccessControlModal mnetSsoAccessControl={mnetSsoAccessControl.mnetSsoAccessControl} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No mnet sso access controls
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new mnet sso access control.
      </p>
      <div className="mt-6">
        <MnetSsoAccessControlModal emptyState={true} />
      </div>
    </div>
  );
};

