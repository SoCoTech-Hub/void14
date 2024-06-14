import FolderList from "@/components/folders/FolderList";
import NewFolderModal from "@/components/folders/FolderModal";
import { api } from "@/lib/trpc/api";

export default async function Folders() {
  const { folders } = await api.folders.getFolders.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Folders</h1>
        <NewFolderModal />
      </div>
      <FolderList folders={folders} />
    </main>
  );
}
