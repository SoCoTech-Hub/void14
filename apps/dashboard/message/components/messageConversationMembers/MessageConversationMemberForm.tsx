"use client";

import { MessageConversationMember, NewMessageConversationMemberParams, insertMessageConversationMemberParams } from "@soco/message-db/schema/messageConversationMembers";
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

const MessageConversationMemberForm = ({
  messageConversationMember,
  closeModal,
}: {
  messageConversationMember?: MessageConversationMember;
  closeModal?: () => void;
}) => {
  
  const editing = !!messageConversationMember?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMessageConversationMemberParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMessageConversationMemberParams),
    defaultValues: messageConversationMember ?? {
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

    await utils.messageConversationMembers.getMessageConversationMembers.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Message Conversation Member ${action}d!`);
  };

  const { mutate: createMessageConversationMember, isLoading: isCreating } =
    trpc.messageConversationMembers.createMessageConversationMember.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMessageConversationMember, isLoading: isUpdating } =
    trpc.messageConversationMembers.updateMessageConversationMember.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMessageConversationMember, isLoading: isDeleting } =
    trpc.messageConversationMembers.deleteMessageConversationMember.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMessageConversationMemberParams) => {
    if (editing) {
      updateMessageConversationMember({ ...values, id: messageConversationMember.id });
    } else {
      createMessageConversationMember(values);
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
            onClick={() => deleteMessageConversationMember({ id: messageConversationMember.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MessageConversationMemberForm;
