"use client";
import { CompleteWikiPage } from "@soco/wiki-db/schema/wikiPages";
import { trpc } from "@/lib/trpc/client";
import WikiPageModal from "./WikiPageModal";


export default function WikiPageList({ wikiPages }: { wikiPages: CompleteWikiPage[] }) {
  const { data: w } = trpc.wikiPages.getWikiPages.useQuery(undefined, {
    initialData: { wikiPages },
    refetchOnMount: false,
  });

  if (w.wikiPages.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.wikiPages.map((wikiPage) => (
        <WikiPage wikiPage={wikiPage} key={wikiPage.id} />
      ))}
    </ul>
  );
}

const WikiPage = ({ wikiPage }: { wikiPage: CompleteWikiPage }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{wikiPage.cachedContent}</div>
      </div>
      <WikiPageModal wikiPage={wikiPage} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No wiki pages
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new wiki page.
      </p>
      <div className="mt-6">
        <WikiPageModal emptyState={true} />
      </div>
    </div>
  );
};

