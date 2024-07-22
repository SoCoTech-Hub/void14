"use client";

import { PaymentAccount, NewPaymentAccountParams, insertPaymentAccountParams } from "@soco/payment-db/schema/paymentAccounts";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PaymentAccountForm = ({
  paymentAccount,
  closeModal,
}: {
  paymentAccount?: PaymentAccount;
  closeModal?: () => void;
}) => {
  
  const editing = !!paymentAccount?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertPaymentAccountParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertPaymentAccountParams),
    defaultValues: paymentAccount ?? {
      archived: false,
     contextId: "",
     enabled: false,
     idNumber: "",
     name: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.paymentAccounts.getPaymentAccounts.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Payment Account ${action}d!`);
  };

  const { mutate: createPaymentAccount, isLoading: isCreating } =
    trpc.paymentAccounts.createPaymentAccount.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updatePaymentAccount, isLoading: isUpdating } =
    trpc.paymentAccounts.updatePaymentAccount.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deletePaymentAccount, isLoading: isDeleting } =
    trpc.paymentAccounts.deletePaymentAccount.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewPaymentAccountParams) => {
    if (editing) {
      updatePaymentAccount({ ...values, id: paymentAccount.id });
    } else {
      createPaymentAccount(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="archived"
          render={({ field }) => (<FormItem>
              <FormLabel>Archived</FormLabel>
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
          name="contextId"
          render={({ field }) => (<FormItem>
              <FormLabel>Context Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enabled"
          render={({ field }) => (<FormItem>
              <FormLabel>Enabled</FormLabel>
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
          name="idNumber"
          render={({ field }) => (<FormItem>
              <FormLabel>Id Number</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (<FormItem>
              <FormLabel>Name</FormLabel>
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
            onClick={() => deletePaymentAccount({ id: paymentAccount.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default PaymentAccountForm;
