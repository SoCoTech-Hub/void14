import EnrolLtiLti2UserResultList from "@/components/enrolLtiLti2UserResults/EnrolLtiLti2UserResultList";
import NewEnrolLtiLti2UserResultModal from "@/components/enrolLtiLti2UserResults/EnrolLtiLti2UserResultModal";
import { api } from "@/lib/trpc/api";

export default async function EnrolLtiLti2UserResults() {
  const { enrolLtiLti2UserResults } = await api.enrolLtiLti2UserResults.getEnrolLtiLti2UserResults.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrol Lti Lti2 User Results</h1>
        <NewEnrolLtiLti2UserResultModal />
      </div>
      <EnrolLtiLti2UserResultList enrolLtiLti2UserResults={enrolLtiLti2UserResults} />
    </main>
  );
}
