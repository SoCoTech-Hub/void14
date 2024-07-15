"use client";

import { MnetRemoteService2rpc, NewMnetRemoteService2rpcParams, insertMnetRemoteService2rpcParams } from "@soco/mnet-db/schema/mnetRemoteService2rpcs";
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

const MnetRemoteService2rpcForm = ({
  mnetRemoteService2rpc,
  closeModal,
}: {
  mnetRemoteService2rpc?: MnetRemoteService2rpc;
  closeModal?: () => void;
}) => {
  
  const editing = !!mnetRemoteService2rpc?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMnetRemoteService2rpcParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMnetRemoteService2rpcParams),
    defaultValues: mnetRemoteService2rpc ?? {
      rpcId: "",
     serviceId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.mnetRemoteService2rpcs.getMnetRemoteService2rpcs.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Mnet Remote Service2rpc ${action}d!`);
  };

  const { mutate: createMnetRemoteService2rpc, isLoading: isCreating } =
    trpc.mnetRemoteService2rpcs.createMnetRemoteService2rpc.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMnetRemoteService2rpc, isLoading: isUpdating } =
    trpc.mnetRemoteService2rpcs.updateMnetRemoteService2rpc.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMnetRemoteService2rpc, isLoading: isDeleting } =
    trpc.mnetRemoteService2rpcs.deleteMnetRemoteService2rpc.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMnetRemoteService2rpcParams) => {
    if (editing) {
      updateMnetRemoteService2rpc({ ...values, id: mnetRemoteService2rpc.id });
    } else {
      createMnetRemoteService2rpc(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="rpcId"
          render={({ field }) => (<FormItem>
              <FormLabel>Rpc Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="serviceId"
          render={({ field }) => (<FormItem>
              <FormLabel>Service Id</FormLabel>
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
            onClick={() => deleteMnetRemoteService2rpc({ id: mnetRemoteService2rpc.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MnetRemoteService2rpcForm;
