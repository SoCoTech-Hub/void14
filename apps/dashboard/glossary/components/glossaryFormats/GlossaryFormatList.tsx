"use client";
import { CompleteGlossaryFormat } from "@soco/glossary-db/schema/glossaryFormats";
import { trpc } from "@/lib/trpc/client";
import GlossaryFormatModal from "./GlossaryFormatModal";


export default function GlossaryFormatList({ glossaryFormats }: { glossaryFormats: CompleteGlossaryFormat[] }) {
  const { data: g } = trpc.glossaryFormats.getGlossaryFormats.useQuery(undefined, {
    initialData: { glossaryFormats },
    refetchOnMount: false,
  });

  if (g.glossaryFormats.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.glossaryFormats.map((glossaryFormat) => (
        <GlossaryFormat glossaryFormat={glossaryFormat} key={glossaryFormat.id} />
      ))}
    </ul>
  );
}

const GlossaryFormat = ({ glossaryFormat }: { glossaryFormat: CompleteGlossaryFormat }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{glossaryFormat.defaultHook}</div>
      </div>
      <GlossaryFormatModal glossaryFormat={glossaryFormat} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No glossary formats
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new glossary format.
      </p>
      <div className="mt-6">
        <GlossaryFormatModal emptyState={true} />
      </div>
    </div>
  );
};

