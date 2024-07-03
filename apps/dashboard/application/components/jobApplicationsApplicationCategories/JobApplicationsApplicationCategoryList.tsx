"use client";
import { CompleteJobApplicationsApplicationCategory } from "@/lib/db/schema/jobApplicationsApplicationCategories";
import { trpc } from "@/lib/trpc/client";
import JobApplicationsApplicationCategoryModal from "./JobApplicationsApplicationCategoryModal";


export default function JobApplicationsApplicationCategoryList({ jobApplicationsApplicationCategories }: { jobApplicationsApplicationCategories: CompleteJobApplicationsApplicationCategory[] }) {
  const { data: j } = trpc.jobApplicationsApplicationCategories.getJobApplicationsApplicationCategories.useQuery(undefined, {
    initialData: { jobApplicationsApplicationCategories },
    refetchOnMount: false,
  });

  if (j.jobApplicationsApplicationCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {j.jobApplicationsApplicationCategories.map((jobApplicationsApplicationCategory) => (
        <JobApplicationsApplicationCategory jobApplicationsApplicationCategory={jobApplicationsApplicationCategory} key={jobApplicationsApplicationCategory.jobApplicationsApplicationCategory.id} />
      ))}
    </ul>
  );
}

const JobApplicationsApplicationCategory = ({ jobApplicationsApplicationCategory }: { jobApplicationsApplicationCategory: CompleteJobApplicationsApplicationCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{jobApplicationsApplicationCategory.jobApplicationsApplicationCategory.jobApplicationId}</div>
      </div>
      <JobApplicationsApplicationCategoryModal jobApplicationsApplicationCategory={jobApplicationsApplicationCategory.jobApplicationsApplicationCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No job applications application categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new job applications application category.
      </p>
      <div className="mt-6">
        <JobApplicationsApplicationCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

