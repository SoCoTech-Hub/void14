"use client";

import { MessageUsersBlocked, NewMessageUsersBlockedParams, insertMessageUsersBlockedParams } from "@/lib/db/schema/messageUsersBlockeds";
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

const MessageUsersBlockedForm = ({
  messageUsersBlocked,
  closeModal,
}: {
  messageUsersBlocked?: MessageUsersBlocked;
  closeModal?: () => void;
}) => {
  
  const editing = !!messageUsersBlocked?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMessageUsersBlockedParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMessageUsersBlockedParams),
    defaultValues: messageUsersBlocked ?? {
      blockedUserId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.messageUsersBlockeds.getMessageUsersBlockeds.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Message Users Blocked ${action}d!`);
  };

  const { mutate: createMessageUsersBlocked, isLoading: isCreating } =
    trpc.messageUsersBlockeds.createMessageUsersBlocked.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMessageUsersBlocked, isLoading: isUpdating } =
    trpc.messageUsersBlockeds.updateMessageUsersBlocked.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMessageUsersBlocked, isLoading: isDeleting } =
    trpc.messageUsersBlockeds.deleteMessageUsersBlocked.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMessageUsersBlockedParams) => {
    if (editing) {
      updateMessageUsersBlocked({ ...values, id: messageUsersBlocked.id });
    } else {
      createMessageUsersBlocked(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="blockedUserId"
          render={({ field }) => (<FormItem>
              <FormLabel>Blocked User Id</FormLabel>
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
            onClick={() => deleteMessageUsersBlocked({ id: messageUsersBlocked.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MessageUsersBlockedForm;
