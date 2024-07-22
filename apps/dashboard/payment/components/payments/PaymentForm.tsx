"use client";

import { Payment, NewPaymentParams, insertPaymentParams } from "@soco/payment-db/schema/payments";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@soco/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PaymentForm = ({
  payment,
  closeModal,
}: {
  payment?: Payment;
  closeModal?: () => void;
}) => {
  const { data: paymentAccounts } = trpc.paymentAccounts.getPaymentAccounts.useQuery();
  const editing = !!payment?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertPaymentParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertPaymentParams),
    defaultValues: payment ?? {
      paymentAccountId: "",
     component: "",
     amount: 0.0,
     currency: "",
     gateway: "",
     itemId: "",
     paymentArea: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.payments.getPayments.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Payment ${action}d!`);
  };

  const { mutate: createPayment, isLoading: isCreating } =
    trpc.payments.createPayment.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updatePayment, isLoading: isUpdating } =
    trpc.payments.updatePayment.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deletePayment, isLoading: isDeleting } =
    trpc.payments.deletePayment.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewPaymentParams) => {
    if (editing) {
      updatePayment({ ...values, id: payment.id });
    } else {
      createPayment(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="paymentAccountId"
          render={({ field }) => (<FormItem>
              <FormLabel>Payment Account Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment account" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentAccounts?.paymentAccounts.map((paymentAccount) => (
                      <SelectItem key={paymentAccount.id} value={paymentAccount.id.toString()}>
                        {paymentAccount.id}  {/* TODO: Replace with a field from the paymentAccount model */}
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
          name="component"
          render={({ field }) => (<FormItem>
              <FormLabel>Component</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (<FormItem>
              <FormLabel>Amount</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (<FormItem>
              <FormLabel>Currency</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gateway"
          render={({ field }) => (<FormItem>
              <FormLabel>Gateway</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemId"
          render={({ field }) => (<FormItem>
              <FormLabel>Item Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentArea"
          render={({ field }) => (<FormItem>
              <FormLabel>Payment Area</FormLabel>
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
            onClick={() => deletePayment({ id: payment.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default PaymentForm;
