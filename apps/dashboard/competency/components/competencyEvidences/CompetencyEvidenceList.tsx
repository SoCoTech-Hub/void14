"use client";
import { CompleteCompetencyEvidence } from "@/lib/db/schema/competencyEvidences";
import { trpc } from "@/lib/trpc/client";
import CompetencyEvidenceModal from "./CompetencyEvidenceModal";


export default function CompetencyEvidenceList({ competencyEvidences }: { competencyEvidences: CompleteCompetencyEvidence[] }) {
  const { data: c } = trpc.competencyEvidences.getCompetencyEvidences.useQuery(undefined, {
    initialData: { competencyEvidences },
    refetchOnMount: false,
  });

  if (c.competencyEvidences.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.competencyEvidences.map((competencyEvidence) => (
        <CompetencyEvidence competencyEvidence={competencyEvidence} key={competencyEvidence.id} />
      ))}
    </ul>
  );
}

const CompetencyEvidence = ({ competencyEvidence }: { competencyEvidence: CompleteCompetencyEvidence }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{competencyEvidence.action}</div>
      </div>
      <CompetencyEvidenceModal competencyEvidence={competencyEvidence} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No competency evidences
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new competency evidence.
      </p>
      <div className="mt-6">
        <CompetencyEvidenceModal emptyState={true} />
      </div>
    </div>
  );
};

