"use client";
import { CompleteGradeImportNewitem } from "@soco/grade-db/schema/gradeImportNewitems";
import { trpc } from "@/lib/trpc/client";
import GradeImportNewitemModal from "./GradeImportNewitemModal";


export default function GradeImportNewitemList({ gradeImportNewitems }: { gradeImportNewitems: CompleteGradeImportNewitem[] }) {
  const { data: g } = trpc.gradeImportNewitems.getGradeImportNewitems.useQuery(undefined, {
    initialData: { gradeImportNewitems },
    refetchOnMount: false,
  });

  if (g.gradeImportNewitems.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradeImportNewitems.map((gradeImportNewitem) => (
        <GradeImportNewitem gradeImportNewitem={gradeImportNewitem} key={gradeImportNewitem.id} />
      ))}
    </ul>
  );
}

const GradeImportNewitem = ({ gradeImportNewitem }: { gradeImportNewitem: CompleteGradeImportNewitem }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradeImportNewitem.importCode}</div>
      </div>
      <GradeImportNewitemModal gradeImportNewitem={gradeImportNewitem} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No grade import newitems
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new grade import newitem.
      </p>
      <div className="mt-6">
        <GradeImportNewitemModal emptyState={true} />
      </div>
    </div>
  );
};

