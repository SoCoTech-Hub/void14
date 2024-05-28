import FieldList from "@/components/fields/FieldList";
import NewFieldModal from "@/components/fields/FieldModal";
import { api } from "@/lib/trpc/api";

export default async function Fields() {
  const { fields } = await api.fields.getFields.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Fields</h1>
        <NewFieldModal />
      </div>
      <FieldList fields={fields} />
    </main>
  );
}
