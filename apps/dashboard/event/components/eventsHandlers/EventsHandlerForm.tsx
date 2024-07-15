"use client";

import { EventsHandler, NewEventsHandlerParams, insertEventsHandlerParams } from "@soco/event-db/schema/eventsHandlers";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EventsHandlerForm = ({
  eventsHandler,
  closeModal,
}: {
  eventsHandler?: EventsHandler;
  closeModal?: () => void;
}) => {
  
  const editing = !!eventsHandler?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEventsHandlerParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEventsHandlerParams),
    defaultValues: eventsHandler ?? {
      component: "",
     eventName: "",
     handlerFile: "",
     handlerFunction: "",
     internal: false,
     schedule: "",
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

    await utils.eventsHandlers.getEventsHandlers.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Events Handler ${action}d!`);
  };

  const { mutate: createEventsHandler, isLoading: isCreating } =
    trpc.eventsHandlers.createEventsHandler.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEventsHandler, isLoading: isUpdating } =
    trpc.eventsHandlers.updateEventsHandler.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEventsHandler, isLoading: isDeleting } =
    trpc.eventsHandlers.deleteEventsHandler.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEventsHandlerParams) => {
    if (editing) {
      updateEventsHandler({ ...values, id: eventsHandler.id });
    } else {
      createEventsHandler(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="component"
          render={({ field }) => (<FormItem>
              <FormLabel>Component</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (<FormItem>
              <FormLabel>Event Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="handlerFile"
          render={({ field }) => (<FormItem>
              <FormLabel>Handler File</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="handlerFunction"
          render={({ field }) => (<FormItem>
              <FormLabel>Handler Function</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="internal"
          render={({ field }) => (<FormItem>
              <FormLabel>Internal</FormLabel>
                <br />
            <FormControl>
              <Checkbox {...field} checked={!!field.value} onCheckedChange={field.onChange} value={""} />
            </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="schedule"
          render={({ field }) => (<FormItem>
              <FormLabel>Schedule</FormLabel>
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
            onClick={() => deleteEventsHandler({ id: eventsHandler.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EventsHandlerForm;
