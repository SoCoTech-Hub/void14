"use client";

import { PaymentGateway, NewPaymentGatewayParams, insertPaymentGatewayParams } from "@soco/payment-db/schema/paymentGateways";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PaymentGatewayForm = ({
  paymentGateway,
  closeModal,
}: {
  paymentGateway?: PaymentGateway;
  closeModal?: () => void;
}) => {
  const { data: paymentAccounts } = trpc.paymentAccounts.getPaymentAccounts.useQuery();
  const editing = !!paymentGateway?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertPaymentGatewayParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertPaymentGatewayParams),
    defaultValues: paymentGateway ?? {
      paymentAccountId: "",
     config: "",
     enabled: false,
     gatewayName: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.paymentGateways.getPaymentGateways.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Payment Gateway ${action}d!`);
  };

  const { mutate: createPaymentGateway, isLoading: isCreating } =
    trpc.paymentGateways.createPaymentGateway.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updatePaymentGateway, isLoading: isUpdating } =
    trpc.paymentGateways.updatePaymentGateway.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deletePaymentGateway, isLoading: isDeleting } =
    trpc.paymentGateways.deletePaymentGateway.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewPaymentGatewayParams) => {
    if (editing) {
      updatePaymentGateway({ ...values, id: paymentGateway.id });
    } else {
      createPaymentGateway(values);
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
          name="config"
          render={({ field }) => (<FormItem>
              <FormLabel>Config</FormLabel>
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
          name="gatewayName"
          render={({ field }) => (<FormItem>
              <FormLabel>Gateway Name</FormLabel>
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
            onClick={() => deletePaymentGateway({ id: paymentGateway.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default PaymentGatewayForm;
