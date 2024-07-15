"use client";
import { CompleteToolCustomLang } from "@soco/tool-custom-lang-db/schema/toolCustomLangs";
import { trpc } from "@/lib/trpc/client";
import ToolCustomLangModal from "./ToolCustomLangModal";


export default function ToolCustomLangList({ toolCustomLangs }: { toolCustomLangs: CompleteToolCustomLang[] }) {
  const { data: t } = trpc.toolCustomLangs.getToolCustomLangs.useQuery(undefined, {
    initialData: { toolCustomLangs },
    refetchOnMount: false,
  });

  if (t.toolCustomLangs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolCustomLangs.map((toolCustomLang) => (
        <ToolCustomLang toolCustomLang={toolCustomLang} key={toolCustomLang.id} />
      ))}
    </ul>
  );
}

const ToolCustomLang = ({ toolCustomLang }: { toolCustomLang: CompleteToolCustomLang }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolCustomLang.componentId}</div>
      </div>
      <ToolCustomLangModal toolCustomLang={toolCustomLang} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool custom langs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool custom lang.
      </p>
      <div className="mt-6">
        <ToolCustomLangModal emptyState={true} />
      </div>
    </div>
  );
};

