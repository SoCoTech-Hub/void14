"use client";

import { MnetRpc, NewMnetRpcParams, insertMnetRpcParams } from "@/lib/db/schema/mnetRpcs";
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

const MnetRpcForm = ({
  mnetRpc,
  closeModal,
}: {
  mnetRpc?: MnetRpc;
  closeModal?: () => void;
}) => {
  
  const editing = !!mnetRpc?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMnetRpcParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMnetRpcParams),
    defaultValues: mnetRpc ?? {
      classname: "",
     enabled: false,
     fileName: "",
     functionName: "",
     help: "",
     pluginName: "",
     pluginType: "",
     profile: "",
     static: false,
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

    await utils.mnetRpcs.getMnetRpcs.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Mnet Rpc ${action}d!`);
  };

  const { mutate: createMnetRpc, isLoading: isCreating } =
    trpc.mnetRpcs.createMnetRpc.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMnetRpc, isLoading: isUpdating } =
    trpc.mnetRpcs.updateMnetRpc.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMnetRpc, isLoading: isDeleting } =
    trpc.mnetRpcs.deleteMnetRpc.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMnetRpcParams) => {
    if (editing) {
      updateMnetRpc({ ...values, id: mnetRpc.id });
    } else {
      createMnetRpc(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="classname"
          render={({ field }) => (<FormItem>
              <FormLabel>Classname</FormLabel>
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
          name="fileName"
          render={({ field }) => (<FormItem>
              <FormLabel>File Name</FormLabel>
                <FormControl>
            <Input {...field} />
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
          name="help"
          render={({ field }) => (<FormItem>
              <FormLabel>Help</FormLabel>
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
          name="profile"
          render={({ field }) => (<FormItem>
              <FormLabel>Profile</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="static"
          render={({ field }) => (<FormItem>
              <FormLabel>Static</FormLabel>
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
            onClick={() => deleteMnetRpc({ id: mnetRpc.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MnetRpcForm;
