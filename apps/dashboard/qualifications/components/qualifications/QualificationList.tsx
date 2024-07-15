"use client";
import { CompleteQualification } from "@soco/qualifications-db/schema/qualifications";
import { trpc } from "@/lib/trpc/client";
import QualificationModal from "./QualificationModal";


export default function QualificationList({ qualifications }: { qualifications: CompleteQualification[] }) {
  const { data: q } = trpc.qualifications.getQualifications.useQuery(undefined, {
    initialData: { qualifications },
    refetchOnMount: false,
  });

  if (q.qualifications.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.qualifications.map((qualification) => (
        <Qualification qualification={qualification} key={qualification.id} />
      ))}
    </ul>
  );
}

const Qualification = ({ qualification }: { qualification: CompleteQualification }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{qualification.name}</div>
      </div>
      <QualificationModal qualification={qualification} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No qualifications
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new qualification.
      </p>
      <div className="mt-6">
        <QualificationModal emptyState={true} />
      </div>
    </div>
  );
};

