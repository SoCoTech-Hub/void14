"use client";
import { CompleteEditorAttoAutosave } from "@soco/editor-db/schema/editorAttoAutosaves";
import { trpc } from "@/lib/trpc/client";
import EditorAttoAutosaveModal from "./EditorAttoAutosaveModal";


export default function EditorAttoAutosaveList({ editorAttoAutosaves }: { editorAttoAutosaves: CompleteEditorAttoAutosave[] }) {
  const { data: e } = trpc.editorAttoAutosaves.getEditorAttoAutosaves.useQuery(undefined, {
    initialData: { editorAttoAutosaves },
    refetchOnMount: false,
  });

  if (e.editorAttoAutosaves.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.editorAttoAutosaves.map((editorAttoAutosave) => (
        <EditorAttoAutosave editorAttoAutosave={editorAttoAutosave} key={editorAttoAutosave.id} />
      ))}
    </ul>
  );
}

const EditorAttoAutosave = ({ editorAttoAutosave }: { editorAttoAutosave: CompleteEditorAttoAutosave }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{editorAttoAutosave.contextId}</div>
      </div>
      <EditorAttoAutosaveModal editorAttoAutosave={editorAttoAutosave} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No editor atto autosaves
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new editor atto autosave.
      </p>
      <div className="mt-6">
        <EditorAttoAutosaveModal emptyState={true} />
      </div>
    </div>
  );
};

