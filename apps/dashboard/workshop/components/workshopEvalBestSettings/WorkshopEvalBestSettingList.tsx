"use client";
import { CompleteWorkshopEvalBestSetting } from "@/lib/db/schema/workshopEvalBestSettings";
import { trpc } from "@/lib/trpc/client";
import WorkshopEvalBestSettingModal from "./WorkshopEvalBestSettingModal";


export default function WorkshopEvalBestSettingList({ workshopEvalBestSettings }: { workshopEvalBestSettings: CompleteWorkshopEvalBestSetting[] }) {
  const { data: w } = trpc.workshopEvalBestSettings.getWorkshopEvalBestSettings.useQuery(undefined, {
    initialData: { workshopEvalBestSettings },
    refetchOnMount: false,
  });

  if (w.workshopEvalBestSettings.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.workshopEvalBestSettings.map((workshopEvalBestSetting) => (
        <WorkshopEvalBestSetting workshopEvalBestSetting={workshopEvalBestSetting} key={workshopEvalBestSetting.workshopEvalBestSetting.id} />
      ))}
    </ul>
  );
}

const WorkshopEvalBestSetting = ({ workshopEvalBestSetting }: { workshopEvalBestSetting: CompleteWorkshopEvalBestSetting }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{workshopEvalBestSetting.workshopEvalBestSetting.comparison}</div>
      </div>
      <WorkshopEvalBestSettingModal workshopEvalBestSetting={workshopEvalBestSetting.workshopEvalBestSetting} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No workshop eval best settings
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new workshop eval best setting.
      </p>
      <div className="mt-6">
        <WorkshopEvalBestSettingModal emptyState={true} />
      </div>
    </div>
  );
};

