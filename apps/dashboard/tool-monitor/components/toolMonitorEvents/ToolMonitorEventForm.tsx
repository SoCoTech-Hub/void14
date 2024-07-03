"use client";

import { ToolMonitorEvent, NewToolMonitorEventParams, insertToolMonitorEventParams } from "@/lib/db/schema/toolMonitorEvents";
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

const ToolMonitorEventForm = ({
  toolMonitorEvent,
  closeModal,
}: {
  toolMonitorEvent?: ToolMonitorEvent;
  closeModal?: () => void;
}) => {
  
  const editing = !!toolMonitorEvent?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertToolMonitorEventParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertToolMonitorEventParams),
    defaultValues: toolMonitorEvent ?? {
      contextId: "",
     contextInstanceId: "",
     contextLevel: "",
     courseId: "",
     eventName: "",
     link: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.toolMonitorEvents.getToolMonitorEvents.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Tool Monitor Event ${action}d!`);
  };

  const { mutate: createToolMonitorEvent, isLoading: isCreating } =
    trpc.toolMonitorEvents.createToolMonitorEvent.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateToolMonitorEvent, isLoading: isUpdating } =
    trpc.toolMonitorEvents.updateToolMonitorEvent.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteToolMonitorEvent, isLoading: isDeleting } =
    trpc.toolMonitorEvents.deleteToolMonitorEvent.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewToolMonitorEventParams) => {
    if (editing) {
      updateToolMonitorEvent({ ...values, id: toolMonitorEvent.id });
    } else {
      createToolMonitorEvent(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="contextId"
          render={({ field }) => (<FormItem>
              <FormLabel>Context Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contextInstanceId"
          render={({ field }) => (<FormItem>
              <FormLabel>Context Instance Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contextLevel"
          render={({ field }) => (<FormItem>
              <FormLabel>Context Level</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (<FormItem>
              <FormLabel>Course Id</FormLabel>
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
          name="link"
          render={({ field }) => (<FormItem>
              <FormLabel>Link</FormLabel>
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
            onClick={() => deleteToolMonitorEvent({ id: toolMonitorEvent.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ToolMonitorEventForm;
