"use client";

import { EventsQueueHandler, NewEventsQueueHandlerParams, insertEventsQueueHandlerParams } from "@soco/event-db/schema/eventsQueueHandlers";
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

const EventsQueueHandlerForm = ({
  eventsQueueHandler,
  closeModal,
}: {
  eventsQueueHandler?: EventsQueueHandler;
  closeModal?: () => void;
}) => {
  
  const editing = !!eventsQueueHandler?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEventsQueueHandlerParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEventsQueueHandlerParams),
    defaultValues: eventsQueueHandler ?? {
      errorMessage: "",
     handlerId: "",
     queuedEventId: "",
     status: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.eventsQueueHandlers.getEventsQueueHandlers.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Events Queue Handler ${action}d!`);
  };

  const { mutate: createEventsQueueHandler, isLoading: isCreating } =
    trpc.eventsQueueHandlers.createEventsQueueHandler.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEventsQueueHandler, isLoading: isUpdating } =
    trpc.eventsQueueHandlers.updateEventsQueueHandler.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEventsQueueHandler, isLoading: isDeleting } =
    trpc.eventsQueueHandlers.deleteEventsQueueHandler.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEventsQueueHandlerParams) => {
    if (editing) {
      updateEventsQueueHandler({ ...values, id: eventsQueueHandler.id });
    } else {
      createEventsQueueHandler(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="errorMessage"
          render={({ field }) => (<FormItem>
              <FormLabel>Error Message</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="handlerId"
          render={({ field }) => (<FormItem>
              <FormLabel>Handler Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="queuedEventId"
          render={({ field }) => (<FormItem>
              <FormLabel>Queued Event Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (<FormItem>
              <FormLabel>Status</FormLabel>
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
            onClick={() => deleteEventsQueueHandler({ id: eventsQueueHandler.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EventsQueueHandlerForm;
