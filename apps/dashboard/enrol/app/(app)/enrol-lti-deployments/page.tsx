import EnrolLtiDeploymentList from "@/components/enrolLtiDeployments/EnrolLtiDeploymentList";
import NewEnrolLtiDeploymentModal from "@/components/enrolLtiDeployments/EnrolLtiDeploymentModal";
import { api } from "@/lib/trpc/api";

export default async function EnrolLtiDeployments() {
  const { enrolLtiDeployments } = await api.enrolLtiDeployments.getEnrolLtiDeployments.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrol Lti Deployments</h1>
        <NewEnrolLtiDeploymentModal />
      </div>
      <EnrolLtiDeploymentList enrolLtiDeployments={enrolLtiDeployments} />
    </main>
  );
}
