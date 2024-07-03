"use client";
import { CompleteWikiVersion } from "@/lib/db/schema/wikiVersions";
import { trpc } from "@/lib/trpc/client";
import WikiVersionModal from "./WikiVersionModal";


export default function WikiVersionList({ wikiVersions }: { wikiVersions: CompleteWikiVersion[] }) {
  const { data: w } = trpc.wikiVersions.getWikiVersions.useQuery(undefined, {
    initialData: { wikiVersions },
    refetchOnMount: false,
  });

  if (w.wikiVersions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.wikiVersions.map((wikiVersion) => (
        <WikiVersion wikiVersion={wikiVersion} key={wikiVersion.wikiVersion.id} />
      ))}
    </ul>
  );
}

const WikiVersion = ({ wikiVersion }: { wikiVersion: CompleteWikiVersion }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{wikiVersion.wikiVersion.content}</div>
      </div>
      <WikiVersionModal wikiVersion={wikiVersion.wikiVersion} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No wiki versions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new wiki version.
      </p>
      <div className="mt-6">
        <WikiVersionModal emptyState={true} />
      </div>
    </div>
  );
};

