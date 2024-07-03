"use client";
import { CompleteToolCustomLangComponent } from "@/lib/db/schema/toolCustomLangComponents";
import { trpc } from "@/lib/trpc/client";
import ToolCustomLangComponentModal from "./ToolCustomLangComponentModal";


export default function ToolCustomLangComponentList({ toolCustomLangComponents }: { toolCustomLangComponents: CompleteToolCustomLangComponent[] }) {
  const { data: t } = trpc.toolCustomLangComponents.getToolCustomLangComponents.useQuery(undefined, {
    initialData: { toolCustomLangComponents },
    refetchOnMount: false,
  });

  if (t.toolCustomLangComponents.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolCustomLangComponents.map((toolCustomLangComponent) => (
        <ToolCustomLangComponent toolCustomLangComponent={toolCustomLangComponent} key={toolCustomLangComponent.id} />
      ))}
    </ul>
  );
}

const ToolCustomLangComponent = ({ toolCustomLangComponent }: { toolCustomLangComponent: CompleteToolCustomLangComponent }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolCustomLangComponent.name}</div>
      </div>
      <ToolCustomLangComponentModal toolCustomLangComponent={toolCustomLangComponent} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool custom lang components
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool custom lang component.
      </p>
      <div className="mt-6">
        <ToolCustomLangComponentModal emptyState={true} />
      </div>
    </div>
  );
};

