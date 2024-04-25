import UniversityList from "@/components/universities/UniversityList";
import NewUniversityModal from "@/components/universities/UniversityModal";
import { api } from "@/lib/trpc/api";

export default async function Universities() {
  const { universities } = await api.universities.getUniversities.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Universities</h1>
        <NewUniversityModal />
      </div>
      <UniversityList universities={universities} />
    </main>
  );
}
