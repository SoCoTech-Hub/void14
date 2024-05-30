import EnrolList from "@/components/enrols/EnrolList";
import NewEnrolModal from "@/components/enrols/EnrolModal";
import { api } from "@/lib/trpc/api";

export default async function Enrols() {
  const { enrols } = await api.enrols.getEnrols.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrols</h1>
        <NewEnrolModal />
      </div>
      <EnrolList enrols={enrols} />
    </main>
  );
}
