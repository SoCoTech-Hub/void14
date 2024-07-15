import JobApplicationList from "@/components/jobApplications/JobApplicationList";
import NewJobApplicationModal from "@/components/jobApplications/JobApplicationModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function JobApplications() {
  await checkAuth();
  const { jobApplications } = await api.jobApplications.getJobApplications.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Job Applications</h1>
        <NewJobApplicationModal />
      </div>
      <JobApplicationList jobApplications={jobApplications} />
    </main>
  );
}
