"use client";
import { CompleteNote } from "@/lib/db/schema/notes";
import { trpc } from "@/lib/trpc/client";
import NoteModal from "./NoteModal";


export default function NoteList({ notes }: { notes: CompleteNote[] }) {
  const { data: n } = trpc.notes.getNotes.useQuery(undefined, {
    initialData: { notes },
    refetchOnMount: false,
  });

  if (n.notes.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {n.notes.map((note) => (
        <Note note={note} key={note.id} />
      ))}
    </ul>
  );
}

const Note = ({ note }: { note: CompleteNote }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{note.name}</div>
      </div>
      <NoteModal note={note} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No notes
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new note.
      </p>
      <div className="mt-6">
        <NoteModal emptyState={true} />
      </div>
    </div>
  );
};

