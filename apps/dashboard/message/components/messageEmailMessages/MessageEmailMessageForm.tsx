"use client";

import { MessageEmailMessage, NewMessageEmailMessageParams, insertMessageEmailMessageParams } from "@soco/message-db/schema/messageEmailMessages";
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

const MessageEmailMessageForm = ({
  messageEmailMessage,
  closeModal,
}: {
  messageEmailMessage?: MessageEmailMessage;
  closeModal?: () => void;
}) => {
  
  const editing = !!messageEmailMessage?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMessageEmailMessageParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMessageEmailMessageParams),
    defaultValues: messageEmailMessage ?? {
      conversationId: "",
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

    await utils.messageEmailMessages.getMessageEmailMessages.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Message Email Message ${action}d!`);
  };

  const { mutate: createMessageEmailMessage, isLoading: isCreating } =
    trpc.messageEmailMessages.createMessageEmailMessage.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMessageEmailMessage, isLoading: isUpdating } =
    trpc.messageEmailMessages.updateMessageEmailMessage.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMessageEmailMessage, isLoading: isDeleting } =
    trpc.messageEmailMessages.deleteMessageEmailMessage.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMessageEmailMessageParams) => {
    if (editing) {
      updateMessageEmailMessage({ ...values, id: messageEmailMessage.id });
    } else {
      createMessageEmailMessage(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="conversationId"
          render={({ field }) => (<FormItem>
              <FormLabel>Conversation Id</FormLabel>
                <FormControl>
            <Input {...field} />
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
            onClick={() => deleteMessageEmailMessage({ id: messageEmailMessage.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MessageEmailMessageForm;
