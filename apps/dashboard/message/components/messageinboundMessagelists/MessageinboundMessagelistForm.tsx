"use client";

import { MessageinboundMessagelist, NewMessageinboundMessagelistParams, insertMessageinboundMessagelistParams } from "@soco/message-db/schema/messageinboundMessagelists";
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

const MessageinboundMessagelistForm = ({
  messageinboundMessagelist,
  closeModal,
}: {
  messageinboundMessagelist?: MessageinboundMessagelist;
  closeModal?: () => void;
}) => {
  
  const editing = !!messageinboundMessagelist?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMessageinboundMessagelistParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMessageinboundMessagelistParams),
    defaultValues: messageinboundMessagelist ?? {
      address: "",
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

    await utils.messageinboundMessagelists.getMessageinboundMessagelists.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Messageinbound Messagelist ${action}d!`);
  };

  const { mutate: createMessageinboundMessagelist, isLoading: isCreating } =
    trpc.messageinboundMessagelists.createMessageinboundMessagelist.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMessageinboundMessagelist, isLoading: isUpdating } =
    trpc.messageinboundMessagelists.updateMessageinboundMessagelist.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMessageinboundMessagelist, isLoading: isDeleting } =
    trpc.messageinboundMessagelists.deleteMessageinboundMessagelist.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMessageinboundMessagelistParams) => {
    if (editing) {
      updateMessageinboundMessagelist({ ...values, id: messageinboundMessagelist.id });
    } else {
      createMessageinboundMessagelist(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (<FormItem>
              <FormLabel>Address</FormLabel>
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
            onClick={() => deleteMessageinboundMessagelist({ id: messageinboundMessagelist.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MessageinboundMessagelistForm;
