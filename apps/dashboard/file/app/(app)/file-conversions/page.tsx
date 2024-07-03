import FileConversionList from "@/components/fileConversions/FileConversionList";
import NewFileConversionModal from "@/components/fileConversions/FileConversionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function FileConversions() {
  await checkAuth();
  const { fileConversions } = await api.fileConversions.getFileConversions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">File Conversions</h1>
        <NewFileConversionModal />
      </div>
      <FileConversionList fileConversions={fileConversions} />
    </main>
  );
}
