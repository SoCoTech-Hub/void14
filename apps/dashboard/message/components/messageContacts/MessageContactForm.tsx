"use client";

import { MessageContact, NewMessageContactParams, insertMessageContactParams } from "@soco/message-db/schema/messageContacts";
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

const MessageContactForm = ({
  messageContact,
  closeModal,
}: {
  messageContact?: MessageContact;
  closeModal?: () => void;
}) => {
  
  const editing = !!messageContact?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMessageContactParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMessageContactParams),
    defaultValues: messageContact ?? {
      contactId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.messageContacts.getMessageContacts.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Message Contact ${action}d!`);
  };

  const { mutate: createMessageContact, isLoading: isCreating } =
    trpc.messageContacts.createMessageContact.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMessageContact, isLoading: isUpdating } =
    trpc.messageContacts.updateMessageContact.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMessageContact, isLoading: isDeleting } =
    trpc.messageContacts.deleteMessageContact.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMessageContactParams) => {
    if (editing) {
      updateMessageContact({ ...values, id: messageContact.id });
    } else {
      createMessageContact(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="contactId"
          render={({ field }) => (<FormItem>
              <FormLabel>Contact Id</FormLabel>
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
            onClick={() => deleteMessageContact({ id: messageContact.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MessageContactForm;
