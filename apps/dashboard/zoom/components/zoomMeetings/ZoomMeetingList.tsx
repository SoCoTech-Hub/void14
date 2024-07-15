"use client";
import { CompleteZoomMeeting } from "@soco/zoom-db/schema/zoomMeetings";
import { trpc } from "@/lib/trpc/client";
import ZoomMeetingModal from "./ZoomMeetingModal";


export default function ZoomMeetingList({ zoomMeetings }: { zoomMeetings: CompleteZoomMeeting[] }) {
  const { data: z } = trpc.zoomMeetings.getZoomMeetings.useQuery(undefined, {
    initialData: { zoomMeetings },
    refetchOnMount: false,
  });

  if (z.zoomMeetings.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {z.zoomMeetings.map((zoomMeeting) => (
        <ZoomMeeting zoomMeeting={zoomMeeting} key={zoomMeeting.id} />
      ))}
    </ul>
  );
}

const ZoomMeeting = ({ zoomMeeting }: { zoomMeeting: CompleteZoomMeeting }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{zoomMeeting.meetingLink}</div>
      </div>
      <ZoomMeetingModal zoomMeeting={zoomMeeting} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No zoom meetings
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new zoom meeting.
      </p>
      <div className="mt-6">
        <ZoomMeetingModal emptyState={true} />
      </div>
    </div>
  );
};

