import FileList from "@/components/files/FileList";
import NewFileModal from "@/components/files/FileModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Files() {
  await checkAuth();
  const { files } = await api.files.getFiles.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Files</h1>
        <NewFileModal />
      </div>
      <FileList files={files} />
    </main>
  );
}
