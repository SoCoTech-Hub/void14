"use client";

import { EnrolLtiLti2ToolProxy, NewEnrolLtiLti2ToolProxyParams, insertEnrolLtiLti2ToolProxyParams } from "@/lib/db/schema/enrolLtiLti2ToolProxys";
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

const EnrolLtiLti2ToolProxyForm = ({
  enrolLtiLti2ToolProxy,
  closeModal,
}: {
  enrolLtiLti2ToolProxy?: EnrolLtiLti2ToolProxy;
  closeModal?: () => void;
}) => {
  
  const editing = !!enrolLtiLti2ToolProxy?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEnrolLtiLti2ToolProxyParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEnrolLtiLti2ToolProxyParams),
    defaultValues: enrolLtiLti2ToolProxy ?? {
      consumerId: "",
     toolProxy: "",
     toolProxyKey: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.enrolLtiLti2ToolProxys.getEnrolLtiLti2ToolProxys.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Enrol Lti Lti2 Tool Proxy ${action}d!`);
  };

  const { mutate: createEnrolLtiLti2ToolProxy, isLoading: isCreating } =
    trpc.enrolLtiLti2ToolProxys.createEnrolLtiLti2ToolProxy.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEnrolLtiLti2ToolProxy, isLoading: isUpdating } =
    trpc.enrolLtiLti2ToolProxys.updateEnrolLtiLti2ToolProxy.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEnrolLtiLti2ToolProxy, isLoading: isDeleting } =
    trpc.enrolLtiLti2ToolProxys.deleteEnrolLtiLti2ToolProxy.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEnrolLtiLti2ToolProxyParams) => {
    if (editing) {
      updateEnrolLtiLti2ToolProxy({ ...values, id: enrolLtiLti2ToolProxy.id });
    } else {
      createEnrolLtiLti2ToolProxy(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="consumerId"
          render={({ field }) => (<FormItem>
              <FormLabel>Consumer Id</FormLabel>
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
          name="toolProxyKey"
          render={({ field }) => (<FormItem>
              <FormLabel>Tool Proxy Key</FormLabel>
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
            onClick={() => deleteEnrolLtiLti2ToolProxy({ id: enrolLtiLti2ToolProxy.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EnrolLtiLti2ToolProxyForm;
