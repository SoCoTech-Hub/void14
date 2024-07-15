import EditorAttoAutosaveList from "@/components/editorAttoAutosaves/EditorAttoAutosaveList";
import NewEditorAttoAutosaveModal from "@/components/editorAttoAutosaves/EditorAttoAutosaveModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function EditorAttoAutosaves() {
  await checkAuth();
  const { editorAttoAutosaves } = await api.editorAttoAutosaves.getEditorAttoAutosaves.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Editor Atto Autosaves</h1>
        <NewEditorAttoAutosaveModal />
      </div>
      <EditorAttoAutosaveList editorAttoAutosaves={editorAttoAutosaves} />
    </main>
  );
}
