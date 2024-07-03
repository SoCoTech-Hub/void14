"use client";
import { CompleteCompetencyCourseCompSetting } from "@/lib/db/schema/competencyCourseCompSettings";
import { trpc } from "@/lib/trpc/client";
import CompetencyCourseCompSettingModal from "./CompetencyCourseCompSettingModal";


export default function CompetencyCourseCompSettingList({ competencyCourseCompSettings }: { competencyCourseCompSettings: CompleteCompetencyCourseCompSetting[] }) {
  const { data: c } = trpc.competencyCourseCompSettings.getCompetencyCourseCompSettings.useQuery(undefined, {
    initialData: { competencyCourseCompSettings },
    refetchOnMount: false,
  });

  if (c.competencyCourseCompSettings.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.competencyCourseCompSettings.map((competencyCourseCompSetting) => (
        <CompetencyCourseCompSetting competencyCourseCompSetting={competencyCourseCompSetting} key={competencyCourseCompSetting.id} />
      ))}
    </ul>
  );
}

const CompetencyCourseCompSetting = ({ competencyCourseCompSetting }: { competencyCourseCompSetting: CompleteCompetencyCourseCompSetting }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{competencyCourseCompSetting.courseId}</div>
      </div>
      <CompetencyCourseCompSettingModal competencyCourseCompSetting={competencyCourseCompSetting} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No competency course comp settings
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new competency course comp setting.
      </p>
      <div className="mt-6">
        <CompetencyCourseCompSettingModal emptyState={true} />
      </div>
    </div>
  );
};

