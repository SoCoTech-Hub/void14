import NoteList from "@/components/notes/NoteList";
import NewNoteModal from "@/components/notes/NoteModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function Notes() {
  await checkAuth();
  const { notes } = await api.notes.getNotes.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Notes</h1>
        <NewNoteModal />
      </div>
      <NoteList notes={notes} />
    </main>
  );
}
