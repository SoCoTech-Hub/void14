"use client";
import { CompleteLtiTypesConfig } from "@soco/lti-db/schema/ltiTypesConfigs";
import { trpc } from "@/lib/trpc/client";
import LtiTypesConfigModal from "./LtiTypesConfigModal";


export default function LtiTypesConfigList({ ltiTypesConfigs }: { ltiTypesConfigs: CompleteLtiTypesConfig[] }) {
  const { data: l } = trpc.ltiTypesConfigs.getLtiTypesConfigs.useQuery(undefined, {
    initialData: { ltiTypesConfigs },
    refetchOnMount: false,
  });

  if (l.ltiTypesConfigs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.ltiTypesConfigs.map((ltiTypesConfig) => (
        <LtiTypesConfig ltiTypesConfig={ltiTypesConfig} key={ltiTypesConfig.id} />
      ))}
    </ul>
  );
}

const LtiTypesConfig = ({ ltiTypesConfig }: { ltiTypesConfig: CompleteLtiTypesConfig }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{ltiTypesConfig.name}</div>
      </div>
      <LtiTypesConfigModal ltiTypesConfig={ltiTypesConfig} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No lti types configs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new lti types config.
      </p>
      <div className="mt-6">
        <LtiTypesConfigModal emptyState={true} />
      </div>
    </div>
  );
};

