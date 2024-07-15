"use client";
import { CompleteBigBlueButtonBnRecording } from "@soco/big-blue-button-db/schema/bigBlueButtonBnRecordings";
import { trpc } from "@/lib/trpc/client";
import BigBlueButtonBnRecordingModal from "./BigBlueButtonBnRecordingModal";


export default function BigBlueButtonBnRecordingList({ bigBlueButtonBnRecordings }: { bigBlueButtonBnRecordings: CompleteBigBlueButtonBnRecording[] }) {
  const { data: b } = trpc.bigBlueButtonBnRecordings.getBigBlueButtonBnRecordings.useQuery(undefined, {
    initialData: { bigBlueButtonBnRecordings },
    refetchOnMount: false,
  });

  if (b.bigBlueButtonBnRecordings.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.bigBlueButtonBnRecordings.map((bigBlueButtonBnRecording) => (
        <BigBlueButtonBnRecording bigBlueButtonBnRecording={bigBlueButtonBnRecording} key={bigBlueButtonBnRecording.bigBlueButtonBnRecording.id} />
      ))}
    </ul>
  );
}

const BigBlueButtonBnRecording = ({ bigBlueButtonBnRecording }: { bigBlueButtonBnRecording: CompleteBigBlueButtonBnRecording }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{bigBlueButtonBnRecording.bigBlueButtonBnRecording.bigBlueButtonBnId}</div>
      </div>
      <BigBlueButtonBnRecordingModal bigBlueButtonBnRecording={bigBlueButtonBnRecording.bigBlueButtonBnRecording} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No big blue button bn recordings
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new big blue button bn recording.
      </p>
      <div className="mt-6">
        <BigBlueButtonBnRecordingModal emptyState={true} />
      </div>
    </div>
  );
};

