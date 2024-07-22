"use client";

import { MessageUserAction, NewMessageUserActionParams, insertMessageUserActionParams } from "@soco/message-db/schema/messageUserActions";
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

const MessageUserActionForm = ({
  messageUserAction,
  closeModal,
}: {
  messageUserAction?: MessageUserAction;
  closeModal?: () => void;
}) => {
  
  const editing = !!messageUserAction?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMessageUserActionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMessageUserActionParams),
    defaultValues: messageUserAction ?? {
      action: 0,
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

    await utils.messageUserActions.getMessageUserActions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Message User Action ${action}d!`);
  };

  const { mutate: createMessageUserAction, isLoading: isCreating } =
    trpc.messageUserActions.createMessageUserAction.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMessageUserAction, isLoading: isUpdating } =
    trpc.messageUserActions.updateMessageUserAction.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMessageUserAction, isLoading: isDeleting } =
    trpc.messageUserActions.deleteMessageUserAction.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMessageUserActionParams) => {
    if (editing) {
      updateMessageUserAction({ ...values, id: messageUserAction.id });
    } else {
      createMessageUserAction(values);
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
            onClick={() => deleteMessageUserAction({ id: messageUserAction.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MessageUserActionForm;
