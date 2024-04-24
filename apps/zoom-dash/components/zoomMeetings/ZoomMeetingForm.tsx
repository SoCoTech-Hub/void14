"use client";

import { ZoomMeeting, NewZoomMeetingParams, insertZoomMeetingParams } from "@/lib/db/schema/zoomMeetings";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ZoomMeetingForm = ({
  zoomMeeting,
  closeModal,
}: {
  zoomMeeting?: ZoomMeeting;
  closeModal?: () => void;
}) => {
  const { data: zooms } = trpc.zooms.getZooms.useQuery();
  const editing = !!zoomMeeting?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertZoomMeetingParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertZoomMeetingParams),
    defaultValues: zoomMeeting ?? {
      meetingLink: "",
     participants: "",
     zoomId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.zoomMeetings.getZoomMeetings.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Zoom Meeting ${action}d!`);
  };

  const { mutate: createZoomMeeting, isLoading: isCreating } =
    trpc.zoomMeetings.createZoomMeeting.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateZoomMeeting, isLoading: isUpdating } =
    trpc.zoomMeetings.updateZoomMeeting.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteZoomMeeting, isLoading: isDeleting } =
    trpc.zoomMeetings.deleteZoomMeeting.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewZoomMeetingParams) => {
    if (editing) {
      updateZoomMeeting({ ...values, id: zoomMeeting.id });
    } else {
      createZoomMeeting(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="meetingLink"
          render={({ field }) => (<FormItem>
              <FormLabel>Meeting Link</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="participants"
          render={({ field }) => (<FormItem>
              <FormLabel>Participants</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zoomId"
          render={({ field }) => (<FormItem>
              <FormLabel>Zoom Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a zoom" />
                  </SelectTrigger>
                  <SelectContent>
                    {zooms?.zooms.map((zoom) => (
                      <SelectItem key={zoom.id} value={zoom.id.toString()}>
                        {zoom.email}  {/* TODO: Replace with a field from the zoom model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteZoomMeeting({ id: zoomMeeting.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ZoomMeetingForm;
