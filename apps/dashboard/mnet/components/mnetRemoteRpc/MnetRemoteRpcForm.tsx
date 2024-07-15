"use client";

import { MnetRemoteRpc, NewMnetRemoteRpcParams, insertMnetRemoteRpcParams } from "@soco/mnet-db/schema/mnetRemoteRpc";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MnetRemoteRpcForm = ({
  mnetRemoteRpc,
  closeModal,
}: {
  mnetRemoteRpc?: MnetRemoteRpc;
  closeModal?: () => void;
}) => {
  
  const editing = !!mnetRemoteRpc?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMnetRemoteRpcParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMnetRemoteRpcParams),
    defaultValues: mnetRemoteRpc ?? {
      enabled: false,
     functionName: "",
     pluginName: "",
     pluginType: "",
     xmlRpcPath: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.mnetRemoteRpc.getMnetRemoteRpc.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Mnet Remote Rpc ${action}d!`);
  };

  const { mutate: createMnetRemoteRpc, isLoading: isCreating } =
    trpc.mnetRemoteRpc.createMnetRemoteRpc.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMnetRemoteRpc, isLoading: isUpdating } =
    trpc.mnetRemoteRpc.updateMnetRemoteRpc.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMnetRemoteRpc, isLoading: isDeleting } =
    trpc.mnetRemoteRpc.deleteMnetRemoteRpc.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMnetRemoteRpcParams) => {
    if (editing) {
      updateMnetRemoteRpc({ ...values, id: mnetRemoteRpc.id });
    } else {
      createMnetRemoteRpc(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
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
          name="functionName"
          render={({ field }) => (<FormItem>
              <FormLabel>Function Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pluginName"
          render={({ field }) => (<FormItem>
              <FormLabel>Plugin Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pluginType"
          render={({ field }) => (<FormItem>
              <FormLabel>Plugin Type</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="xmlRpcPath"
          render={({ field }) => (<FormItem>
              <FormLabel>Xml Rpc Path</FormLabel>
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
            onClick={() => deleteMnetRemoteRpc({ id: mnetRemoteRpc.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MnetRemoteRpcForm;
