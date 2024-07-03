"use client";
import { CompleteWikiSubwiki } from "@/lib/db/schema/wikiSubwikis";
import { trpc } from "@/lib/trpc/client";
import WikiSubwikiModal from "./WikiSubwikiModal";


export default function WikiSubwikiList({ wikiSubwikis }: { wikiSubwikis: CompleteWikiSubwiki[] }) {
  const { data: w } = trpc.wikiSubwikis.getWikiSubwikis.useQuery(undefined, {
    initialData: { wikiSubwikis },
    refetchOnMount: false,
  });

  if (w.wikiSubwikis.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.wikiSubwikis.map((wikiSubwiki) => (
        <WikiSubwiki wikiSubwiki={wikiSubwiki} key={wikiSubwiki.wikiSubwiki.id} />
      ))}
    </ul>
  );
}

const WikiSubwiki = ({ wikiSubwiki }: { wikiSubwiki: CompleteWikiSubwiki }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{wikiSubwiki.wikiSubwiki.groupId}</div>
      </div>
      <WikiSubwikiModal wikiSubwiki={wikiSubwiki.wikiSubwiki} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No wiki subwikis
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new wiki subwiki.
      </p>
      <div className="mt-6">
        <WikiSubwikiModal emptyState={true} />
      </div>
    </div>
  );
};

