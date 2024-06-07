"use client";

import { EventsQueue, NewEventsQueueParams, insertEventsQueueParams } from "@/lib/db/schema/eventsQueues";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EventsQueueForm = ({
  eventsQueue,
  closeModal,
}: {
  eventsQueue?: EventsQueue;
  closeModal?: () => void;
}) => {
  
  const editing = !!eventsQueue?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEventsQueueParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEventsQueueParams),
    defaultValues: eventsQueue ?? {
      eventData: "",
     stackDump: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.eventsQueues.getEventsQueues.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Events Queue ${action}d!`);
  };

  const { mutate: createEventsQueue, isLoading: isCreating } =
    trpc.eventsQueues.createEventsQueue.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEventsQueue, isLoading: isUpdating } =
    trpc.eventsQueues.updateEventsQueue.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEventsQueue, isLoading: isDeleting } =
    trpc.eventsQueues.deleteEventsQueue.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEventsQueueParams) => {
    if (editing) {
      updateEventsQueue({ ...values, id: eventsQueue.id });
    } else {
      createEventsQueue(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="eventData"
          render={({ field }) => (<FormItem>
              <FormLabel>Event Data</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stackDump"
          render={({ field }) => (<FormItem>
              <FormLabel>Stack Dump</FormLabel>
                <FormControl>
            <Input {...field} />
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
            onClick={() => deleteEventsQueue({ id: eventsQueue.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EventsQueueForm;
