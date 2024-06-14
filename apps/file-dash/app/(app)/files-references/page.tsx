import FilesReferenceList from "@/components/filesReferences/FilesReferenceList";
import NewFilesReferenceModal from "@/components/filesReferences/FilesReferenceModal";
import { api } from "@/lib/trpc/api";

export default async function FilesReferences() {
  const { filesReferences } = await api.filesReferences.getFilesReferences.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Files References</h1>
        <NewFilesReferenceModal />
      </div>
      <FilesReferenceList filesReferences={filesReferences} />
    </main>
  );
}
