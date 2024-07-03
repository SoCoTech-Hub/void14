import GenderList from "@/components/genders/GenderList";
import NewGenderModal from "@/components/genders/GenderModal";
import { api } from "@/lib/trpc/api";

export default async function Genders() {
  const { genders } = await api.genders.getGenders.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Genders</h1>
        <NewGenderModal />
      </div>
      <GenderList genders={genders} />
    </main>
  );
}
