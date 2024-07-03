"use client";
import { CompleteWikiLink } from "@/lib/db/schema/wikiLinks";
import { trpc } from "@/lib/trpc/client";
import WikiLinkModal from "./WikiLinkModal";


export default function WikiLinkList({ wikiLinks }: { wikiLinks: CompleteWikiLink[] }) {
  const { data: w } = trpc.wikiLinks.getWikiLinks.useQuery(undefined, {
    initialData: { wikiLinks },
    refetchOnMount: false,
  });

  if (w.wikiLinks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.wikiLinks.map((wikiLink) => (
        <WikiLink wikiLink={wikiLink} key={wikiLink.wikiLink.id} />
      ))}
    </ul>
  );
}

const WikiLink = ({ wikiLink }: { wikiLink: CompleteWikiLink }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{wikiLink.wikiLink.wikiPageId}</div>
      </div>
      <WikiLinkModal wikiLink={wikiLink.wikiLink} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No wiki links
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new wiki link.
      </p>
      <div className="mt-6">
        <WikiLinkModal emptyState={true} />
      </div>
    </div>
  );
};

