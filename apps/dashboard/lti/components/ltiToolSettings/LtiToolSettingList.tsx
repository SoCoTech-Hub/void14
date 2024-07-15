"use client";
import { CompleteLtiToolSetting } from "@soco/lti-db/schema/ltiToolSettings";
import { trpc } from "@/lib/trpc/client";
import LtiToolSettingModal from "./LtiToolSettingModal";


export default function LtiToolSettingList({ ltiToolSettings }: { ltiToolSettings: CompleteLtiToolSetting[] }) {
  const { data: l } = trpc.ltiToolSettings.getLtiToolSettings.useQuery(undefined, {
    initialData: { ltiToolSettings },
    refetchOnMount: false,
  });

  if (l.ltiToolSettings.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.ltiToolSettings.map((ltiToolSetting) => (
        <LtiToolSetting ltiToolSetting={ltiToolSetting} key={ltiToolSetting.id} />
      ))}
    </ul>
  );
}

const LtiToolSetting = ({ ltiToolSetting }: { ltiToolSetting: CompleteLtiToolSetting }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{ltiToolSetting.course}</div>
      </div>
      <LtiToolSettingModal ltiToolSetting={ltiToolSetting} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No lti tool settings
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new lti tool setting.
      </p>
      <div className="mt-6">
        <LtiToolSettingModal emptyState={true} />
      </div>
    </div>
  );
};

