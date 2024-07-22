"use client";

import { MnetApplication, NewMnetApplicationParams, insertMnetApplicationParams } from "@soco/mnet-db/schema/mnetApplications";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MnetApplicationForm = ({
  mnetApplication,
  closeModal,
}: {
  mnetApplication?: MnetApplication;
  closeModal?: () => void;
}) => {
  
  const editing = !!mnetApplication?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMnetApplicationParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMnetApplicationParams),
    defaultValues: mnetApplication ?? {
      displayName: "",
     name: "",
     ssoJumpUrl: "",
     ssoLandUrl: "",
     xmlrpcServerUrl: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.mnetApplications.getMnetApplications.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Mnet Application ${action}d!`);
  };

  const { mutate: createMnetApplication, isLoading: isCreating } =
    trpc.mnetApplications.createMnetApplication.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMnetApplication, isLoading: isUpdating } =
    trpc.mnetApplications.updateMnetApplication.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMnetApplication, isLoading: isDeleting } =
    trpc.mnetApplications.deleteMnetApplication.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMnetApplicationParams) => {
    if (editing) {
      updateMnetApplication({ ...values, id: mnetApplication.id });
    } else {
      createMnetApplication(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (<FormItem>
              <FormLabel>Display Name</FormLabel>
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
          name="ssoJumpUrl"
          render={({ field }) => (<FormItem>
              <FormLabel>Sso Jump Url</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ssoLandUrl"
          render={({ field }) => (<FormItem>
              <FormLabel>Sso Land Url</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="xmlrpcServerUrl"
          render={({ field }) => (<FormItem>
              <FormLabel>Xmlrpc Server Url</FormLabel>
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
            onClick={() => deleteMnetApplication({ id: mnetApplication.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MnetApplicationForm;
