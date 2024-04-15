import JobApplicationsApplicationCategoryList from "@/components/jobApplicationsApplicationCategories/JobApplicationsApplicationCategoryList";
import NewJobApplicationsApplicationCategoryModal from "@/components/jobApplicationsApplicationCategories/JobApplicationsApplicationCategoryModal";
import { api } from "@/lib/trpc/api";

export default async function JobApplicationsApplicationCategories() {
  const { jobApplicationsApplicationCategories } = await api.jobApplicationsApplicationCategories.getJobApplicationsApplicationCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Job Applications Application Categories</h1>
        <NewJobApplicationsApplicationCategoryModal />
      </div>
      <JobApplicationsApplicationCategoryList jobApplicationsApplicationCategories={jobApplicationsApplicationCategories} />
    </main>
  );
}
