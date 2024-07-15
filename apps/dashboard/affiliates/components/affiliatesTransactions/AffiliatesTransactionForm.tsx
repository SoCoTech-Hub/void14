"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AffiliatesTransaction,
  insertAffiliatesTransactionParams,
  NewAffiliatesTransactionParams,
} from "@/lib/db/schema/affiliatesTransactions";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@soco/utils";

const AffiliatesTransactionForm = ({
  affiliatesTransaction,
  closeModal,
}: {
  affiliatesTransaction?: AffiliatesTransaction;
  closeModal?: () => void;
}) => {
  const { data: affiliates } = trpc.affiliates.getAffiliates.useQuery();
  const { data: affiliatesStatuses } =
    trpc.affiliatesStatuses.getAffiliatesStatuses.useQuery();
  const editing = !!affiliatesTransaction?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertAffiliatesTransactionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertAffiliatesTransactionParams),
    defaultValues: affiliatesTransaction ?? {
      paid: 0,
      balance: 0,
      paidDate: "",
      accountNumber: "",
      affiliateId: "",
      affiliatesStatusId: "",
    },
  });

  const onError = async (
    action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(data.error);
      return;
    }
    return;
  };

  const onSuccess = async (
    action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(data.error);
      return;
    }

    await utils.affiliatesTransactions.getAffiliatesTransactions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Affiliates Transaction ${action}d!`);
  };

  const { mutate: createAffiliatesTransaction, isLoading: isCreating } =
    trpc.affiliatesTransactions.createAffiliatesTransaction.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateAffiliatesTransaction, isLoading: isUpdating } =
    trpc.affiliatesTransactions.updateAffiliatesTransaction.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteAffiliatesTransaction, isLoading: isDeleting } =
    trpc.affiliatesTransactions.deleteAffiliatesTransaction.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewAffiliatesTransactionParams) => {
    if (editing) {
      updateAffiliatesTransaction({ ...values, id: affiliatesTransaction.id });
    } else {
      createAffiliatesTransaction(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="paid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paid</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paidDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paid Date</FormLabel>
              <br />
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="affiliateId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Affiliate Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a affiliate" />
                  </SelectTrigger>
                  <SelectContent>
                    {affiliates?.affiliates.map((affiliate) => (
                      <SelectItem
                        key={affiliate.id}
                        value={affiliate.id.toString()}
                      >
                        {affiliate.note}{" "}
                        {/* TODO: Replace with a field from the affiliate model */}
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
          name="affiliatesStatusId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Affiliates Status Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a affiliates status" />
                  </SelectTrigger>
                  <SelectContent>
                    {affiliatesStatuses?.affiliatesStatuses.map(
                      (affiliatesStatus) => (
                        <SelectItem
                          key={affiliatesStatus.id}
                          value={affiliatesStatus.id.toString()}
                        >
                          {affiliatesStatus.name}{" "}
                          {/* TODO: Replace with a field from the affiliatesStatus model */}
                        </SelectItem>
                      ),
                    )}
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
            onClick={() =>
              deleteAffiliatesTransaction({ id: affiliatesTransaction.id })
            }
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default AffiliatesTransactionForm;
