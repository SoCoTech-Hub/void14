import EnrolLtiLti2ShareKeyList from "@/components/enrolLtiLti2ShareKeys/EnrolLtiLti2ShareKeyList";
import NewEnrolLtiLti2ShareKeyModal from "@/components/enrolLtiLti2ShareKeys/EnrolLtiLti2ShareKeyModal";
import { api } from "@/lib/trpc/api";

export default async function EnrolLtiLti2ShareKeys() {
  const { enrolLtiLti2ShareKeys } = await api.enrolLtiLti2ShareKeys.getEnrolLtiLti2ShareKeys.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrol Lti Lti2 Share Keys</h1>
        <NewEnrolLtiLti2ShareKeyModal />
      </div>
      <EnrolLtiLti2ShareKeyList enrolLtiLti2ShareKeys={enrolLtiLti2ShareKeys} />
    </main>
  );
}
