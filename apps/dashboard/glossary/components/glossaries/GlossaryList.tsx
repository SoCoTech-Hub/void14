"use client";
import { CompleteGlossary } from "@soco/glossary-db/schema/glossaries";
import { trpc } from "@/lib/trpc/client";
import GlossaryModal from "./GlossaryModal";


export default function GlossaryList({ glossaries }: { glossaries: CompleteGlossary[] }) {
  const { data: g } = trpc.glossaries.getGlossaries.useQuery(undefined, {
    initialData: { glossaries },
    refetchOnMount: false,
  });

  if (g.glossaries.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.glossaries.map((glossary) => (
        <Glossary glossary={glossary} key={glossary.id} />
      ))}
    </ul>
  );
}

const Glossary = ({ glossary }: { glossary: CompleteGlossary }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{glossary.allowComments}</div>
      </div>
      <GlossaryModal glossary={glossary} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No glossaries
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new glossary.
      </p>
      <div className="mt-6">
        <GlossaryModal emptyState={true} />
      </div>
    </div>
  );
};

