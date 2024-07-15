"use client";
import { CompleteEnrolLtiDeployment } from "@soco/enrol-db/schema/enrolLtiDeployments";
import { trpc } from "@/lib/trpc/client";
import EnrolLtiDeploymentModal from "./EnrolLtiDeploymentModal";


export default function EnrolLtiDeploymentList({ enrolLtiDeployments }: { enrolLtiDeployments: CompleteEnrolLtiDeployment[] }) {
  const { data: e } = trpc.enrolLtiDeployments.getEnrolLtiDeployments.useQuery(undefined, {
    initialData: { enrolLtiDeployments },
    refetchOnMount: false,
  });

  if (e.enrolLtiDeployments.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrolLtiDeployments.map((enrolLtiDeployment) => (
        <EnrolLtiDeployment enrolLtiDeployment={enrolLtiDeployment} key={enrolLtiDeployment.id} />
      ))}
    </ul>
  );
}

const EnrolLtiDeployment = ({ enrolLtiDeployment }: { enrolLtiDeployment: CompleteEnrolLtiDeployment }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrolLtiDeployment.deploymentId}</div>
      </div>
      <EnrolLtiDeploymentModal enrolLtiDeployment={enrolLtiDeployment} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrol lti deployments
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol lti deployment.
      </p>
      <div className="mt-6">
        <EnrolLtiDeploymentModal emptyState={true} />
      </div>
    </div>
  );
};

