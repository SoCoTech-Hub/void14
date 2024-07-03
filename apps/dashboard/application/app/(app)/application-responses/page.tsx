import ApplicationResponseList from "@/components/applicationResponses/ApplicationResponseList";
import NewApplicationResponseModal from "@/components/applicationResponses/ApplicationResponseModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ApplicationResponses() {
  await checkAuth();
  const { applicationResponses } = await api.applicationResponses.getApplicationResponses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Application Responses</h1>
        <NewApplicationResponseModal />
      </div>
      <ApplicationResponseList applicationResponses={applicationResponses} />
    </main>
  );
}
