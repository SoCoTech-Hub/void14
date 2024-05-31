import EnrolPaypalList from "@/components/enrolPaypals/EnrolPaypalList";
import NewEnrolPaypalModal from "@/components/enrolPaypals/EnrolPaypalModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function EnrolPaypals() {
  await checkAuth();
  const { enrolPaypals } = await api.enrolPaypals.getEnrolPaypals.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrol Paypals</h1>
        <NewEnrolPaypalModal />
      </div>
      <EnrolPaypalList enrolPaypals={enrolPaypals} />
    </main>
  );
}
