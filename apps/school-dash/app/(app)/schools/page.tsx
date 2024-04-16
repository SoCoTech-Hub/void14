import SchoolList from "@/components/schools/SchoolList";
import NewSchoolModal from "@/components/schools/SchoolModal";
import { api } from "@/lib/trpc/api";

export default async function Schools() {
  const { schools } = await api.schools.getSchools.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Schools</h1>
        <NewSchoolModal />
      </div>
      <SchoolList schools={schools} />
    </main>
  );
}
