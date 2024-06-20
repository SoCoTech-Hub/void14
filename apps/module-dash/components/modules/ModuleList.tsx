"use client";
import { CompleteModule } from "@/lib/db/schema/modules";
import { trpc } from "@/lib/trpc/client";
import ModuleModal from "./ModuleModal";


export default function ModuleList({ modules }: { modules: CompleteModule[] }) {
  const { data: m } = trpc.modules.getModules.useQuery(undefined, {
    initialData: { modules },
    refetchOnMount: false,
  });

  if (m.modules.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.modules.map((module) => (
        <Module module={module} key={module.id} />
      ))}
    </ul>
  );
}

const Module = ({ module }: { module: CompleteModule }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{module.cron}</div>
      </div>
      <ModuleModal module={module} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No modules
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new module.
      </p>
      <div className="mt-6">
        <ModuleModal emptyState={true} />
      </div>
    </div>
  );
};

