"use client";

import { LtiToolProxy, NewLtiToolProxyParams, insertLtiToolProxyParams } from "@/lib/db/schema/ltiToolProxies";
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

const LtiToolProxyForm = ({
  ltiToolProxy,
  closeModal,
}: {
  ltiToolProxy?: LtiToolProxy;
  closeModal?: () => void;
}) => {
  
  const editing = !!ltiToolProxy?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertLtiToolProxyParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertLtiToolProxyParams),
    defaultValues: ltiToolProxy ?? {
      capabilityOffered: "",
     createdBy: "",
     guId: "",
     name: "",
     regUrl: "",
     secret: "",
     serviceOffered: "",
     state: 0,
     toolProxy: "",
     vendorCode: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.ltiToolProxies.getLtiToolProxies.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Lti Tool Proxy ${action}d!`);
  };

  const { mutate: createLtiToolProxy, isLoading: isCreating } =
    trpc.ltiToolProxies.createLtiToolProxy.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateLtiToolProxy, isLoading: isUpdating } =
    trpc.ltiToolProxies.updateLtiToolProxy.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteLtiToolProxy, isLoading: isDeleting } =
    trpc.ltiToolProxies.deleteLtiToolProxy.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewLtiToolProxyParams) => {
    if (editing) {
      updateLtiToolProxy({ ...values, id: ltiToolProxy.id });
    } else {
      createLtiToolProxy(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="capabilityOffered"
          render={({ field }) => (<FormItem>
              <FormLabel>Capability Offered</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="createdBy"
          render={({ field }) => (<FormItem>
              <FormLabel>Created By</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guId"
          render={({ field }) => (<FormItem>
              <FormLabel>Gu Id</FormLabel>
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
          name="regUrl"
          render={({ field }) => (<FormItem>
              <FormLabel>Reg Url</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="secret"
          render={({ field }) => (<FormItem>
              <FormLabel>Secret</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="serviceOffered"
          render={({ field }) => (<FormItem>
              <FormLabel>Service Offered</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (<FormItem>
              <FormLabel>State</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="toolProxy"
          render={({ field }) => (<FormItem>
              <FormLabel>Tool Proxy</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vendorCode"
          render={({ field }) => (<FormItem>
              <FormLabel>Vendor Code</FormLabel>
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
            onClick={() => deleteLtiToolProxy({ id: ltiToolProxy.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default LtiToolProxyForm;
