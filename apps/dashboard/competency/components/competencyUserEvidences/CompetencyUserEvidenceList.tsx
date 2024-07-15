"use client";
import { CompleteCompetencyUserEvidence } from "@soco/competency-db/schema/competencyUserEvidences";
import { trpc } from "@/lib/trpc/client";
import CompetencyUserEvidenceModal from "./CompetencyUserEvidenceModal";


export default function CompetencyUserEvidenceList({ competencyUserEvidences }: { competencyUserEvidences: CompleteCompetencyUserEvidence[] }) {
  const { data: c } = trpc.competencyUserEvidences.getCompetencyUserEvidences.useQuery(undefined, {
    initialData: { competencyUserEvidences },
    refetchOnMount: false,
  });

  if (c.competencyUserEvidences.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.competencyUserEvidences.map((competencyUserEvidence) => (
        <CompetencyUserEvidence competencyUserEvidence={competencyUserEvidence} key={competencyUserEvidence.id} />
      ))}
    </ul>
  );
}

const CompetencyUserEvidence = ({ competencyUserEvidence }: { competencyUserEvidence: CompleteCompetencyUserEvidence }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{competencyUserEvidence.name}</div>
      </div>
      <CompetencyUserEvidenceModal competencyUserEvidence={competencyUserEvidence} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No competency user evidences
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new competency user evidence.
      </p>
      <div className="mt-6">
        <CompetencyUserEvidenceModal emptyState={true} />
      </div>
    </div>
  );
};

