"use client";
import { CompleteLicense } from "@/lib/db/schema/licenses";
import { trpc } from "@/lib/trpc/client";
import LicenseModal from "./LicenseModal";


export default function LicenseList({ licenses }: { licenses: CompleteLicense[] }) {
  const { data: l } = trpc.licenses.getLicenses.useQuery(undefined, {
    initialData: { licenses },
    refetchOnMount: false,
  });

  if (l.licenses.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.licenses.map((license) => (
        <License license={license} key={license.id} />
      ))}
    </ul>
  );
}

const License = ({ license }: { license: CompleteLicense }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{license.custom}</div>
      </div>
      <LicenseModal license={license} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No licenses
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new license.
      </p>
      <div className="mt-6">
        <LicenseModal emptyState={true} />
      </div>
    </div>
  );
};

