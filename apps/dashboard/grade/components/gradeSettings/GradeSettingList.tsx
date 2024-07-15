"use client";
import { CompleteGradeSetting } from "@soco/grade-db/schema/gradeSettings";
import { trpc } from "@/lib/trpc/client";
import GradeSettingModal from "./GradeSettingModal";


export default function GradeSettingList({ gradeSettings }: { gradeSettings: CompleteGradeSetting[] }) {
  const { data: g } = trpc.gradeSettings.getGradeSettings.useQuery(undefined, {
    initialData: { gradeSettings },
    refetchOnMount: false,
  });

  if (g.gradeSettings.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradeSettings.map((gradeSetting) => (
        <GradeSetting gradeSetting={gradeSetting} key={gradeSetting.id} />
      ))}
    </ul>
  );
}

const GradeSetting = ({ gradeSetting }: { gradeSetting: CompleteGradeSetting }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradeSetting.courseId}</div>
      </div>
      <GradeSettingModal gradeSetting={gradeSetting} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No grade settings
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grade setting.
      </p>
      <div className="mt-6">
        <GradeSettingModal emptyState={true} />
      </div>
    </div>
  );
};

