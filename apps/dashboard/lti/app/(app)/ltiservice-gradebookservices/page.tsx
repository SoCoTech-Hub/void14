import LtiserviceGradebookserviceList from "@/components/ltiserviceGradebookservices/LtiserviceGradebookserviceList";
import NewLtiserviceGradebookserviceModal from "@/components/ltiserviceGradebookservices/LtiserviceGradebookserviceModal";
import { api } from "@/lib/trpc/api";

export default async function LtiserviceGradebookservices() {
  const { ltiserviceGradebookservices } = await api.ltiserviceGradebookservices.getLtiserviceGradebookservices.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Ltiservice Gradebookservices</h1>
        <NewLtiserviceGradebookserviceModal />
      </div>
      <LtiserviceGradebookserviceList ltiserviceGradebookservices={ltiserviceGradebookservices} />
    </main>
  );
}
