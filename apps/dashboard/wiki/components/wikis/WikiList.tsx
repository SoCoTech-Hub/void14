"use client";
import { CompleteWiki } from "@soco/wiki-db/schema/wikis";
import { trpc } from "@/lib/trpc/client";
import WikiModal from "./WikiModal";


export default function WikiList({ wikis }: { wikis: CompleteWiki[] }) {
  const { data: w } = trpc.wikis.getWikis.useQuery(undefined, {
    initialData: { wikis },
    refetchOnMount: false,
  });

  if (w.wikis.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.wikis.map((wiki) => (
        <Wiki wiki={wiki} key={wiki.id} />
      ))}
    </ul>
  );
}

const Wiki = ({ wiki }: { wiki: CompleteWiki }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{wiki.courseId}</div>
      </div>
      <WikiModal wiki={wiki} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No wikis
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new wiki.
      </p>
      <div className="mt-6">
        <WikiModal emptyState={true} />
      </div>
    </div>
  );
};

