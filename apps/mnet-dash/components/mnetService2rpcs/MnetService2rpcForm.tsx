"use client";

import { MnetService2rpc, NewMnetService2rpcParams, insertMnetService2rpcParams } from "@/lib/db/schema/mnetService2rpcs";
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

const MnetService2rpcForm = ({
  mnetService2rpc,
  closeModal,
}: {
  mnetService2rpc?: MnetService2rpc;
  closeModal?: () => void;
}) => {
  const { data: mnetServices } = trpc.mnetServices.getMnetServices.useQuery();
  const { data: mnetRpcs } = trpc.mnetRpcs.getMnetRpcs.useQuery();
  const editing = !!mnetService2rpc?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMnetService2rpcParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMnetService2rpcParams),
    defaultValues: mnetService2rpc ?? {
      mnetServiceId: "",
     mnetRpcId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.mnetService2rpcs.getMnetService2rpcs.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Mnet Service2rpc ${action}d!`);
  };

  const { mutate: createMnetService2rpc, isLoading: isCreating } =
    trpc.mnetService2rpcs.createMnetService2rpc.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMnetService2rpc, isLoading: isUpdating } =
    trpc.mnetService2rpcs.updateMnetService2rpc.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMnetService2rpc, isLoading: isDeleting } =
    trpc.mnetService2rpcs.deleteMnetService2rpc.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMnetService2rpcParams) => {
    if (editing) {
      updateMnetService2rpc({ ...values, id: mnetService2rpc.id });
    } else {
      createMnetService2rpc(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="mnetServiceId"
          render={({ field }) => (<FormItem>
              <FormLabel>Mnet Service Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mnet service" />
                  </SelectTrigger>
                  <SelectContent>
                    {mnetServices?.mnetServices.map((mnetService) => (
                      <SelectItem key={mnetService.id} value={mnetService.id.toString()}>
                        {mnetService.id}  {/* TODO: Replace with a field from the mnetService model */}
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
          name="mnetRpcId"
          render={({ field }) => (<FormItem>
              <FormLabel>Mnet Rpc Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mnet rpc" />
                  </SelectTrigger>
                  <SelectContent>
                    {mnetRpcs?.mnetRpcs.map((mnetRpc) => (
                      <SelectItem key={mnetRpc.id} value={mnetRpc.id.toString()}>
                        {mnetRpc.id}  {/* TODO: Replace with a field from the mnetRpc model */}
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
            onClick={() => deleteMnetService2rpc({ id: mnetService2rpc.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MnetService2rpcForm;
