import EnrolFlatfileList from "@/components/enrolFlatfiles/EnrolFlatfileList";
import NewEnrolFlatfileModal from "@/components/enrolFlatfiles/EnrolFlatfileModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function EnrolFlatfiles() {
  await checkAuth();
  const { enrolFlatfiles } = await api.enrolFlatfiles.getEnrolFlatfiles.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrol Flatfiles</h1>
        <NewEnrolFlatfileModal />
      </div>
      <EnrolFlatfileList enrolFlatfiles={enrolFlatfiles} />
    </main>
  );
}
