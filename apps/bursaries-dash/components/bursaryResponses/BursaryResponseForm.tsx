"use client";

import { BursaryResponse, NewBursaryResponseParams, insertBursaryResponseParams } from "@/lib/db/schema/bursaryResponses";
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

const BursaryResponseForm = ({
  bursaryResponse,
  closeModal,
}: {
  bursaryResponse?: BursaryResponse;
  closeModal?: () => void;
}) => {
  const { data: bursaries } = trpc.bursaries.getBursaries.useQuery();
  const editing = !!bursaryResponse?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertBursaryResponseParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertBursaryResponseParams),
    defaultValues: bursaryResponse ?? {
      bursaryId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.bursaryResponses.getBursaryResponses.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Bursary Response ${action}d!`);
  };

  const { mutate: createBursaryResponse, isLoading: isCreating } =
    trpc.bursaryResponses.createBursaryResponse.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateBursaryResponse, isLoading: isUpdating } =
    trpc.bursaryResponses.updateBursaryResponse.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteBursaryResponse, isLoading: isDeleting } =
    trpc.bursaryResponses.deleteBursaryResponse.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewBursaryResponseParams) => {
    if (editing) {
      updateBursaryResponse({ ...values, id: bursaryResponse.id });
    } else {
      createBursaryResponse(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="bursaryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Bursary Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a bursary" />
                  </SelectTrigger>
                  <SelectContent>
                    {bursaries?.bursaries.map((bursary) => (
                      <SelectItem key={bursary.id} value={bursary.id.toString()}>
                        {bursary.id}  {/* TODO: Replace with a field from the bursary model */}
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
            onClick={() => deleteBursaryResponse({ id: bursaryResponse.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default BursaryResponseForm;
