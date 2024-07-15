"use client";

import { EnrolPaypal, NewEnrolPaypalParams, insertEnrolPaypalParams } from "@soco/enrol-db/schema/enrolPaypals";
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

const EnrolPaypalForm = ({
  enrolPaypal,
  closeModal,
}: {
  enrolPaypal?: EnrolPaypal;
  closeModal?: () => void;
}) => {
  
  const editing = !!enrolPaypal?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEnrolPaypalParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEnrolPaypalParams),
    defaultValues: enrolPaypal ?? {
      business: "",
     courseId: "",
     instanceId: "",
     itemName: "",
     memo: "",
     optionName1: "",
     optionName2: "",
     optionSelection1X: "",
     optionSelection2X: "",
     parentTxnId: "",
     paymentStatus: "",
     paymentType: "",
     pendingReason: "",
     reasonCode: "",
     receiverEmail: "",
     receiverId: "",
     tax: "",
     txnId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.enrolPaypals.getEnrolPaypals.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Enrol Paypal ${action}d!`);
  };

  const { mutate: createEnrolPaypal, isLoading: isCreating } =
    trpc.enrolPaypals.createEnrolPaypal.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEnrolPaypal, isLoading: isUpdating } =
    trpc.enrolPaypals.updateEnrolPaypal.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEnrolPaypal, isLoading: isDeleting } =
    trpc.enrolPaypals.deleteEnrolPaypal.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEnrolPaypalParams) => {
    if (editing) {
      updateEnrolPaypal({ ...values, id: enrolPaypal.id });
    } else {
      createEnrolPaypal(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="business"
          render={({ field }) => (<FormItem>
              <FormLabel>Business</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (<FormItem>
              <FormLabel>Course Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instanceId"
          render={({ field }) => (<FormItem>
              <FormLabel>Instance Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (<FormItem>
              <FormLabel>Item Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="memo"
          render={({ field }) => (<FormItem>
              <FormLabel>Memo</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="optionName1"
          render={({ field }) => (<FormItem>
              <FormLabel>Option Name1</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="optionName2"
          render={({ field }) => (<FormItem>
              <FormLabel>Option Name2</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="optionSelection1X"
          render={({ field }) => (<FormItem>
              <FormLabel>Option Selection1 X</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="optionSelection2X"
          render={({ field }) => (<FormItem>
              <FormLabel>Option Selection2 X</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parentTxnId"
          render={({ field }) => (<FormItem>
              <FormLabel>Parent Txn Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentStatus"
          render={({ field }) => (<FormItem>
              <FormLabel>Payment Status</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentType"
          render={({ field }) => (<FormItem>
              <FormLabel>Payment Type</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pendingReason"
          render={({ field }) => (<FormItem>
              <FormLabel>Pending Reason</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reasonCode"
          render={({ field }) => (<FormItem>
              <FormLabel>Reason Code</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="receiverEmail"
          render={({ field }) => (<FormItem>
              <FormLabel>Receiver Email</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="receiverId"
          render={({ field }) => (<FormItem>
              <FormLabel>Receiver Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tax"
          render={({ field }) => (<FormItem>
              <FormLabel>Tax</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="txnId"
          render={({ field }) => (<FormItem>
              <FormLabel>Txn Id</FormLabel>
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
            onClick={() => deleteEnrolPaypal({ id: enrolPaypal.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EnrolPaypalForm;
