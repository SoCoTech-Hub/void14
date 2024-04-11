"use client";

import { MassMailListsRecipient, NewMassMailListsRecipientParams, insertMassMailListsRecipientParams } from "@/lib/db/schema/massMailListsRecipients";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MassMailListsRecipientForm = ({
  massMailListsRecipient,
  closeModal,
}: {
  massMailListsRecipient?: MassMailListsRecipient;
  closeModal?: () => void;
}) => {
  const { data: massMailLists } = trpc.massMailLists.getMassMailLists.useQuery();
  const { data: massMailRecipients } = trpc.massMailRecipients.getMassMailRecipients.useQuery();
  const editing = !!massMailListsRecipient?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMassMailListsRecipientParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMassMailListsRecipientParams),
    defaultValues: massMailListsRecipient ?? {
      massMailListId: "",
     massMailRecipientId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.massMailListsRecipients.getMassMailListsRecipients.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Mass Mail Lists Recipient ${action}d!`);
  };

  const { mutate: createMassMailListsRecipient, isLoading: isCreating } =
    trpc.massMailListsRecipients.createMassMailListsRecipient.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMassMailListsRecipient, isLoading: isUpdating } =
    trpc.massMailListsRecipients.updateMassMailListsRecipient.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMassMailListsRecipient, isLoading: isDeleting } =
    trpc.massMailListsRecipients.deleteMassMailListsRecipient.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMassMailListsRecipientParams) => {
    if (editing) {
      updateMassMailListsRecipient({ ...values, id: massMailListsRecipient.id });
    } else {
      createMassMailListsRecipient(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="massMailListId"
          render={({ field }) => (<FormItem>
              <FormLabel>Mass Mail List Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mass mail list" />
                  </SelectTrigger>
                  <SelectContent>
                    {massMailLists?.massMailLists.map((massMailList) => (
                      <SelectItem key={massMailList.id} value={massMailList.id.toString()}>
                        {massMailList.id}  {/* TODO: Replace with a field from the massMailList model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="massMailRecipientId"
          render={({ field }) => (<FormItem>
              <FormLabel>Mass Mail Recipient Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mass mail recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    {massMailRecipients?.massMailRecipients.map((massMailRecipient) => (
                      <SelectItem key={massMailRecipient.massMailRecipient.id} value={massMailRecipient.massMailRecipient.id.toString()}>
                        {massMailRecipient.massMailRecipient.id}  {/* TODO: Replace with a field from the massMailRecipient model */}
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
            onClick={() => deleteMassMailListsRecipient({ id: massMailListsRecipient.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MassMailListsRecipientForm;
