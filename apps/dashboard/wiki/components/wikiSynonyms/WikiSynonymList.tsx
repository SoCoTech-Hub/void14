"use client";
import { CompleteWikiSynonym } from "@soco/wiki-db/schema/wikiSynonyms";
import { trpc } from "@/lib/trpc/client";
import WikiSynonymModal from "./WikiSynonymModal";


export default function WikiSynonymList({ wikiSynonyms }: { wikiSynonyms: CompleteWikiSynonym[] }) {
  const { data: w } = trpc.wikiSynonyms.getWikiSynonyms.useQuery(undefined, {
    initialData: { wikiSynonyms },
    refetchOnMount: false,
  });

  if (w.wikiSynonyms.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.wikiSynonyms.map((wikiSynonym) => (
        <WikiSynonym wikiSynonym={wikiSynonym} key={wikiSynonym.wikiSynonym.id} />
      ))}
    </ul>
  );
}

const WikiSynonym = ({ wikiSynonym }: { wikiSynonym: CompleteWikiSynonym }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{wikiSynonym.wikiSynonym.wikiPageId}</div>
      </div>
      <WikiSynonymModal wikiSynonym={wikiSynonym.wikiSynonym} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No wiki synonyms
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new wiki synonym.
      </p>
      <div className="mt-6">
        <WikiSynonymModal emptyState={true} />
      </div>
    </div>
  );
};

