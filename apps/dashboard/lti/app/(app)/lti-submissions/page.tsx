import LtiSubmissionList from "@/components/ltiSubmissions/LtiSubmissionList";
import NewLtiSubmissionModal from "@/components/ltiSubmissions/LtiSubmissionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function LtiSubmissions() {
  await checkAuth();
  const { ltiSubmissions } = await api.ltiSubmissions.getLtiSubmissions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Lti Submissions</h1>
        <NewLtiSubmissionModal />
      </div>
      <LtiSubmissionList ltiSubmissions={ltiSubmissions} />
    </main>
  );
}
