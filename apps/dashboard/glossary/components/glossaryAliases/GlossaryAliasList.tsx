"use client";
import { CompleteGlossaryAlias } from "@soco/glossary-db/schema/glossaryAliases";
import { trpc } from "@/lib/trpc/client";
import GlossaryAliasModal from "./GlossaryAliasModal";


export default function GlossaryAliasList({ glossaryAliases }: { glossaryAliases: CompleteGlossaryAlias[] }) {
  const { data: g } = trpc.glossaryAliases.getGlossaryAliases.useQuery(undefined, {
    initialData: { glossaryAliases },
    refetchOnMount: false,
  });

  if (g.glossaryAliases.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.glossaryAliases.map((glossaryAlias) => (
        <GlossaryAlias glossaryAlias={glossaryAlias} key={glossaryAlias.id} />
      ))}
    </ul>
  );
}

const GlossaryAlias = ({ glossaryAlias }: { glossaryAlias: CompleteGlossaryAlias }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{glossaryAlias.alias}</div>
      </div>
      <GlossaryAliasModal glossaryAlias={glossaryAlias} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No glossary aliases
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new glossary alias.
      </p>
      <div className="mt-6">
        <GlossaryAliasModal emptyState={true} />
      </div>
    </div>
  );
};

