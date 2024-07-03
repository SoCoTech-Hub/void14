"use client";
import { CompleteSupportDepartment } from "@/lib/db/schema/supportDepartments";
import { trpc } from "@/lib/trpc/client";
import SupportDepartmentModal from "./SupportDepartmentModal";


export default function SupportDepartmentList({ supportDepartments }: { supportDepartments: CompleteSupportDepartment[] }) {
  const { data: s } = trpc.supportDepartments.getSupportDepartments.useQuery(undefined, {
    initialData: { supportDepartments },
    refetchOnMount: false,
  });

  if (s.supportDepartments.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.supportDepartments.map((supportDepartment) => (
        <SupportDepartment supportDepartment={supportDepartment} key={supportDepartment.id} />
      ))}
    </ul>
  );
}

const SupportDepartment = ({ supportDepartment }: { supportDepartment: CompleteSupportDepartment }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{supportDepartment.name}</div>
      </div>
      <SupportDepartmentModal supportDepartment={supportDepartment} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No support departments
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new support department.
      </p>
      <div className="mt-6">
        <SupportDepartmentModal emptyState={true} />
      </div>
    </div>
  );
};

