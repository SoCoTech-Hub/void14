import QualificationList from "@/components/qualifications/QualificationList";
import NewQualificationModal from "@/components/qualifications/QualificationModal";
import { api } from "@/lib/trpc/api";

export default async function Qualifications() {
  const { qualifications } = await api.qualifications.getQualifications.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Qualifications</h1>
        <NewQualificationModal />
      </div>
      <QualificationList qualifications={qualifications} />
    </main>
  );
}
