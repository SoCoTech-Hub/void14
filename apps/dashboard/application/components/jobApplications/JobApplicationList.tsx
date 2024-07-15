"use client";
import { CompleteJobApplication } from "@soco/application-db/schema/jobApplications";
import { trpc } from "@/lib/trpc/client";
import JobApplicationModal from "./JobApplicationModal";


export default function JobApplicationList({ jobApplications }: { jobApplications: CompleteJobApplication[] }) {
  const { data: j } = trpc.jobApplications.getJobApplications.useQuery(undefined, {
    initialData: { jobApplications },
    refetchOnMount: false,
  });

  if (j.jobApplications.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {j.jobApplications.map((jobApplication) => (
        <JobApplication jobApplication={jobApplication} key={jobApplication.id} />
      ))}
    </ul>
  );
}

const JobApplication = ({ jobApplication }: { jobApplication: CompleteJobApplication }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{jobApplication.name}</div>
      </div>
      <JobApplicationModal jobApplication={jobApplication} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No job applications
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new job application.
      </p>
      <div className="mt-6">
        <JobApplicationModal emptyState={true} />
      </div>
    </div>
  );
};

