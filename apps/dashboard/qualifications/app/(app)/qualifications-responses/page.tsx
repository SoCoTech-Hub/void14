import QualificationsResponseList from "@/components/qualificationsResponses/QualificationsResponseList";
import NewQualificationsResponseModal from "@/components/qualificationsResponses/QualificationsResponseModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function QualificationsResponses() {
  await checkAuth();
  const { qualificationsResponses } = await api.qualificationsResponses.getQualificationsResponses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Qualifications Responses</h1>
        <NewQualificationsResponseModal />
      </div>
      <QualificationsResponseList qualificationsResponses={qualificationsResponses} />
    </main>
  );
}
