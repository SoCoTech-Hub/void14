"use client";

import { PaygwPaypal, NewPaygwPaypalParams, insertPaygwPaypalParams } from "@soco/payment-db/schema/paygwPaypals";
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

const PaygwPaypalForm = ({
  paygwPaypal,
  closeModal,
}: {
  paygwPaypal?: PaygwPaypal;
  closeModal?: () => void;
}) => {
  const { data: payments } = trpc.payments.getPayments.useQuery();
  const editing = !!paygwPaypal?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertPaygwPaypalParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertPaygwPaypalParams),
    defaultValues: paygwPaypal ?? {
      paymentId: "",
     ppOrderid: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.paygwPaypals.getPaygwPaypals.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Paygw Paypal ${action}d!`);
  };

  const { mutate: createPaygwPaypal, isLoading: isCreating } =
    trpc.paygwPaypals.createPaygwPaypal.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updatePaygwPaypal, isLoading: isUpdating } =
    trpc.paygwPaypals.updatePaygwPaypal.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deletePaygwPaypal, isLoading: isDeleting } =
    trpc.paygwPaypals.deletePaygwPaypal.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewPaygwPaypalParams) => {
    if (editing) {
      updatePaygwPaypal({ ...values, id: paygwPaypal.id });
    } else {
      createPaygwPaypal(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="paymentId"
          render={({ field }) => (<FormItem>
              <FormLabel>Payment Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment" />
                  </SelectTrigger>
                  <SelectContent>
                    {payments?.payments.map((payment) => (
                      <SelectItem key={payment.payment.id} value={payment.payment.id.toString()}>
                        {payment.payment.id}  {/* TODO: Replace with a field from the payment model */}
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
          name="ppOrderid"
          render={({ field }) => (<FormItem>
              <FormLabel>Pp Orderid</FormLabel>
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
            onClick={() => deletePaygwPaypal({ id: paygwPaypal.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default PaygwPaypalForm;
