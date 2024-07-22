"use client";

import { MessageConversationAction, NewMessageConversationActionParams, insertMessageConversationActionParams } from "@soco/message-db/schema/messageConversationActions";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MessageConversationActionForm = ({
  messageConversationAction,
  closeModal,
}: {
  messageConversationAction?: MessageConversationAction;
  closeModal?: () => void;
}) => {
  
  const editing = !!messageConversationAction?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMessageConversationActionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMessageConversationActionParams),
    defaultValues: messageConversationAction ?? {
      action: 0,
     conversationId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.messageConversationActions.getMessageConversationActions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Message Conversation Action ${action}d!`);
  };

  const { mutate: createMessageConversationAction, isLoading: isCreating } =
    trpc.messageConversationActions.createMessageConversationAction.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMessageConversationAction, isLoading: isUpdating } =
    trpc.messageConversationActions.updateMessageConversationAction.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMessageConversationAction, isLoading: isDeleting } =
    trpc.messageConversationActions.deleteMessageConversationAction.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMessageConversationActionParams) => {
    if (editing) {
      updateMessageConversationAction({ ...values, id: messageConversationAction.id });
    } else {
      createMessageConversationAction(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (<FormItem>
              <FormLabel>Action</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
            onClick={() => deleteMessageConversationAction({ id: messageConversationAction.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MessageConversationActionForm;
