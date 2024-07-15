"use client";

import { ExternalServicesFunction, NewExternalServicesFunctionParams, insertExternalServicesFunctionParams } from "@soco/external-db/schema/externalServicesFunctions";
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

const ExternalServicesFunctionForm = ({
  externalServicesFunction,
  closeModal,
}: {
  externalServicesFunction?: ExternalServicesFunction;
  closeModal?: () => void;
}) => {
  
  const editing = !!externalServicesFunction?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertExternalServicesFunctionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertExternalServicesFunctionParams),
    defaultValues: externalServicesFunction ?? {
      externalServiceId: "",
     functionName: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.externalServicesFunctions.getExternalServicesFunctions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`External Services Function ${action}d!`);
  };

  const { mutate: createExternalServicesFunction, isLoading: isCreating } =
    trpc.externalServicesFunctions.createExternalServicesFunction.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateExternalServicesFunction, isLoading: isUpdating } =
    trpc.externalServicesFunctions.updateExternalServicesFunction.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteExternalServicesFunction, isLoading: isDeleting } =
    trpc.externalServicesFunctions.deleteExternalServicesFunction.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewExternalServicesFunctionParams) => {
    if (editing) {
      updateExternalServicesFunction({ ...values, id: externalServicesFunction.id });
    } else {
      createExternalServicesFunction(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="externalServiceId"
          render={({ field }) => (<FormItem>
              <FormLabel>External Service Id</FormLabel>
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
            onClick={() => deleteExternalServicesFunction({ id: externalServicesFunction.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ExternalServicesFunctionForm;
