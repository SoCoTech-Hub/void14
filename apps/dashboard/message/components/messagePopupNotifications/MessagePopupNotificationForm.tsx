"use client";

import { MessagePopupNotification, NewMessagePopupNotificationParams, insertMessagePopupNotificationParams } from "@soco/message-db/schema/messagePopupNotifications";
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

const MessagePopupNotificationForm = ({
  messagePopupNotification,
  closeModal,
}: {
  messagePopupNotification?: MessagePopupNotification;
  closeModal?: () => void;
}) => {
  
  const editing = !!messagePopupNotification?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMessagePopupNotificationParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMessagePopupNotificationParams),
    defaultValues: messagePopupNotification ?? {
      notificationId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.messagePopupNotifications.getMessagePopupNotifications.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Message Popup Notification ${action}d!`);
  };

  const { mutate: createMessagePopupNotification, isLoading: isCreating } =
    trpc.messagePopupNotifications.createMessagePopupNotification.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMessagePopupNotification, isLoading: isUpdating } =
    trpc.messagePopupNotifications.updateMessagePopupNotification.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMessagePopupNotification, isLoading: isDeleting } =
    trpc.messagePopupNotifications.deleteMessagePopupNotification.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMessagePopupNotificationParams) => {
    if (editing) {
      updateMessagePopupNotification({ ...values, id: messagePopupNotification.id });
    } else {
      createMessagePopupNotification(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="notificationId"
          render={({ field }) => (<FormItem>
              <FormLabel>Notification Id</FormLabel>
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
            onClick={() => deleteMessagePopupNotification({ id: messagePopupNotification.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MessagePopupNotificationForm;
