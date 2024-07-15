"use client";
import { CompleteGlossaryEntry } from "@soco/glossary-db/schema/glossaryEntries";
import { trpc } from "@/lib/trpc/client";
import GlossaryEntryModal from "./GlossaryEntryModal";


export default function GlossaryEntryList({ glossaryEntries }: { glossaryEntries: CompleteGlossaryEntry[] }) {
  const { data: g } = trpc.glossaryEntries.getGlossaryEntries.useQuery(undefined, {
    initialData: { glossaryEntries },
    refetchOnMount: false,
  });

  if (g.glossaryEntries.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.glossaryEntries.map((glossaryEntry) => (
        <GlossaryEntry glossaryEntry={glossaryEntry} key={glossaryEntry.id} />
      ))}
    </ul>
  );
}

const GlossaryEntry = ({ glossaryEntry }: { glossaryEntry: CompleteGlossaryEntry }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{glossaryEntry.approved}</div>
      </div>
      <GlossaryEntryModal glossaryEntry={glossaryEntry} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No glossary entries
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new glossary entry.
      </p>
      <div className="mt-6">
        <GlossaryEntryModal emptyState={true} />
      </div>
    </div>
  );
};

