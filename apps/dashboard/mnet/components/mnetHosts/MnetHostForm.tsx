"use client";

import { MnetHost, NewMnetHostParams, insertMnetHostParams } from "@soco/mnet-db/schema/mnetHosts";
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
import { Checkbox } from "@soco/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MnetHostForm = ({
  mnetHost,
  closeModal,
}: {
  mnetHost?: MnetHost;
  closeModal?: () => void;
}) => {
  
  const editing = !!mnetHost?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMnetHostParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMnetHostParams),
    defaultValues: mnetHost ?? {
      applicationId: "",
     deleted: false,
     forceTheme: false,
     ipAddress: "",
     lastConnectTime: 0,
     lastLogId: 0,
     name: "",
     portNo: 0,
     publicKey: "",
     publicKeyExpires: 0,
     sslVerification: false,
     theme: "",
     transport: 0,
     wwwroot: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.mnetHosts.getMnetHosts.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Mnet Host ${action}d!`);
  };

  const { mutate: createMnetHost, isLoading: isCreating } =
    trpc.mnetHosts.createMnetHost.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMnetHost, isLoading: isUpdating } =
    trpc.mnetHosts.updateMnetHost.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMnetHost, isLoading: isDeleting } =
    trpc.mnetHosts.deleteMnetHost.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMnetHostParams) => {
    if (editing) {
      updateMnetHost({ ...values, id: mnetHost.id });
    } else {
      createMnetHost(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="applicationId"
          render={({ field }) => (<FormItem>
              <FormLabel>Application Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deleted"
          render={({ field }) => (<FormItem>
              <FormLabel>Deleted</FormLabel>
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
          name="forceTheme"
          render={({ field }) => (<FormItem>
              <FormLabel>Force Theme</FormLabel>
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
          name="ipAddress"
          render={({ field }) => (<FormItem>
              <FormLabel>Ip Address</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastConnectTime"
          render={({ field }) => (<FormItem>
              <FormLabel>Last Connect Time</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastLogId"
          render={({ field }) => (<FormItem>
              <FormLabel>Last Log Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (<FormItem>
              <FormLabel>Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portNo"
          render={({ field }) => (<FormItem>
              <FormLabel>Port No</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="publicKey"
          render={({ field }) => (<FormItem>
              <FormLabel>Public Key</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="publicKeyExpires"
          render={({ field }) => (<FormItem>
              <FormLabel>Public Key Expires</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sslVerification"
          render={({ field }) => (<FormItem>
              <FormLabel>Ssl Verification</FormLabel>
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
          name="theme"
          render={({ field }) => (<FormItem>
              <FormLabel>Theme</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transport"
          render={({ field }) => (<FormItem>
              <FormLabel>Transport</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="wwwroot"
          render={({ field }) => (<FormItem>
              <FormLabel>Wwwroot</FormLabel>
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
            onClick={() => deleteMnetHost({ id: mnetHost.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MnetHostForm;
