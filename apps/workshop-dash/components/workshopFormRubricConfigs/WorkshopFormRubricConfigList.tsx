"use client";
import { CompleteWorkshopFormRubricConfig } from "@/lib/db/schema/workshopFormRubricConfigs";
import { trpc } from "@/lib/trpc/client";
import WorkshopFormRubricConfigModal from "./WorkshopFormRubricConfigModal";


export default function WorkshopFormRubricConfigList({ workshopFormRubricConfigs }: { workshopFormRubricConfigs: CompleteWorkshopFormRubricConfig[] }) {
  const { data: w } = trpc.workshopFormRubricConfigs.getWorkshopFormRubricConfigs.useQuery(undefined, {
    initialData: { workshopFormRubricConfigs },
    refetchOnMount: false,
  });

  if (w.workshopFormRubricConfigs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.workshopFormRubricConfigs.map((workshopFormRubricConfig) => (
        <WorkshopFormRubricConfig workshopFormRubricConfig={workshopFormRubricConfig} key={workshopFormRubricConfig.workshopFormRubricConfig.id} />
      ))}
    </ul>
  );
}

const WorkshopFormRubricConfig = ({ workshopFormRubricConfig }: { workshopFormRubricConfig: CompleteWorkshopFormRubricConfig }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{workshopFormRubricConfig.workshopFormRubricConfig.layout}</div>
      </div>
      <WorkshopFormRubricConfigModal workshopFormRubricConfig={workshopFormRubricConfig.workshopFormRubricConfig} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No workshop form rubric configs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new workshop form rubric config.
      </p>
      <div className="mt-6">
        <WorkshopFormRubricConfigModal emptyState={true} />
      </div>
    </div>
  );
};

