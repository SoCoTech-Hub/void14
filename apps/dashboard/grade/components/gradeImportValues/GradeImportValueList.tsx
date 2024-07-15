"use client";
import { CompleteGradeImportValue } from "@soco/grade-db/schema/gradeImportValues";
import { trpc } from "@/lib/trpc/client";
import GradeImportValueModal from "./GradeImportValueModal";


export default function GradeImportValueList({ gradeImportValues }: { gradeImportValues: CompleteGradeImportValue[] }) {
  const { data: g } = trpc.gradeImportValues.getGradeImportValues.useQuery(undefined, {
    initialData: { gradeImportValues },
    refetchOnMount: false,
  });

  if (g.gradeImportValues.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradeImportValues.map((gradeImportValue) => (
        <GradeImportValue gradeImportValue={gradeImportValue} key={gradeImportValue.id} />
      ))}
    </ul>
  );
}

const GradeImportValue = ({ gradeImportValue }: { gradeImportValue: CompleteGradeImportValue }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradeImportValue.feedback}</div>
      </div>
      <GradeImportValueModal gradeImportValue={gradeImportValue} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No grade import values
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grade import value.
      </p>
      <div className="mt-6">
        <GradeImportValueModal emptyState={true} />
      </div>
    </div>
  );
};

