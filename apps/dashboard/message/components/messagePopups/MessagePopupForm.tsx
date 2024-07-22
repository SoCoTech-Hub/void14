"use client";

import { MessagePopup, NewMessagePopupParams, insertMessagePopupParams } from "@soco/message-db/schema/messagePopups";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@soco/ui/form";
import { Input } from "@soco/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@soco/ui/button";
import { z } from "zod";
import { Checkbox } from "@soco/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@soco/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MessagePopupForm = ({
  messagePopup,
  closeModal,
}: {
  messagePopup?: MessagePopup;
  closeModal?: () => void;
}) => {
  const { data: messages } = trpc.messages.getMessages.useQuery();
  const editing = !!messagePopup?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMessagePopupParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMessagePopupParams),
    defaultValues: messagePopup ?? {
      isRead: false,
     messageId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.messagePopups.getMessagePopups.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Message Popup ${action}d!`);
  };

  const { mutate: createMessagePopup, isLoading: isCreating } =
    trpc.messagePopups.createMessagePopup.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMessagePopup, isLoading: isUpdating } =
    trpc.messagePopups.updateMessagePopup.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMessagePopup, isLoading: isDeleting } =
    trpc.messagePopups.deleteMessagePopup.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMessagePopupParams) => {
    if (editing) {
      updateMessagePopup({ ...values, id: messagePopup.id });
    } else {
      createMessagePopup(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="isRead"
          render={({ field }) => (<FormItem>
              <FormLabel>Is Read</FormLabel>
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
          name="messageId"
          render={({ field }) => (<FormItem>
              <FormLabel>Message Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a message" />
                  </SelectTrigger>
                  <SelectContent>
                    {messages?.messages.map((message) => (
                      <SelectItem key={message.id} value={message.id.toString()}>
                        {message.id}  {/* TODO: Replace with a field from the message model */}
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
            onClick={() => deleteMessagePopup({ id: messagePopup.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MessagePopupForm;
