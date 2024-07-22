"use client";

import { useRouter } from "next/navigation";
import { Button } from "@soco/ui/button";
import { Calendar } from "@soco/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@soco/ui/form";
import { Input } from "@soco/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@soco/ui/popover";
import {
  insertMessageinboundDatakeyParams,
  MessageinboundDatakey,
  NewMessageinboundDatakeyParams,
} from "@soco/message-db/schema/messageinboundDatakeys";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@soco/utils";

const MessageinboundDatakeyForm = ({
  messageinboundDatakey,
  closeModal,
}: {
  messageinboundDatakey?: MessageinboundDatakey;
  closeModal?: () => void;
}) => {
  const editing = !!messageinboundDatakey?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMessageinboundDatakeyParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMessageinboundDatakeyParams),
    defaultValues: messageinboundDatakey ?? {
      dataKey: "",
      dataValue: 0,
      expires: "",
      handler: "",
    },
  });

  const onSuccess = async (
    action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(data.error);
      return;
    }

    await utils.messageinboundDatakeys.getMessageinboundDatakeys.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Messageinbound Datakey ${action}d!`);
  };

  const { mutate: createMessageinboundDatakey, isLoading: isCreating } =
    trpc.messageinboundDatakeys.createMessageinboundDatakey.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMessageinboundDatakey, isLoading: isUpdating } =
    trpc.messageinboundDatakeys.updateMessageinboundDatakey.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMessageinboundDatakey, isLoading: isDeleting } =
    trpc.messageinboundDatakeys.deleteMessageinboundDatakey.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMessageinboundDatakeyParams) => {
    if (editing) {
      updateMessageinboundDatakey({ ...values, id: messageinboundDatakey.id });
    } else {
      createMessageinboundDatakey(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="dataKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Key</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dataValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Value</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expires"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expires</FormLabel>
              <br />
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="handler"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Handler</FormLabel>
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
            onClick={() =>
              deleteMessageinboundDatakey({ id: messageinboundDatakey.id })
            }
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MessageinboundDatakeyForm;
