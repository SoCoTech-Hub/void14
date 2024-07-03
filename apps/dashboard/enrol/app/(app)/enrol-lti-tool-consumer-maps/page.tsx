import EnrolLtiToolConsumerMapList from "@/components/enrolLtiToolConsumerMaps/EnrolLtiToolConsumerMapList";
import NewEnrolLtiToolConsumerMapModal from "@/components/enrolLtiToolConsumerMaps/EnrolLtiToolConsumerMapModal";
import { api } from "@/lib/trpc/api";

export default async function EnrolLtiToolConsumerMaps() {
  const { enrolLtiToolConsumerMaps } = await api.enrolLtiToolConsumerMaps.getEnrolLtiToolConsumerMaps.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrol Lti Tool Consumer Maps</h1>
        <NewEnrolLtiToolConsumerMapModal />
      </div>
      <EnrolLtiToolConsumerMapList enrolLtiToolConsumerMaps={enrolLtiToolConsumerMaps} />
    </main>
  );
}
