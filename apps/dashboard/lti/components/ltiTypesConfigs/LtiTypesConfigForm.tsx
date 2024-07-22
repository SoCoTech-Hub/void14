"use client";

import { LtiTypesConfig, NewLtiTypesConfigParams, insertLtiTypesConfigParams } from "@soco/lti-db/schema/ltiTypesConfigs";
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

const LtiTypesConfigForm = ({
  ltiTypesConfig,
  closeModal,
}: {
  ltiTypesConfig?: LtiTypesConfig;
  closeModal?: () => void;
}) => {
  
  const editing = !!ltiTypesConfig?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertLtiTypesConfigParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertLtiTypesConfigParams),
    defaultValues: ltiTypesConfig ?? {
      name: "",
     typeId: "",
     value: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.ltiTypesConfigs.getLtiTypesConfigs.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Lti Types Config ${action}d!`);
  };

  const { mutate: createLtiTypesConfig, isLoading: isCreating } =
    trpc.ltiTypesConfigs.createLtiTypesConfig.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateLtiTypesConfig, isLoading: isUpdating } =
    trpc.ltiTypesConfigs.updateLtiTypesConfig.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteLtiTypesConfig, isLoading: isDeleting } =
    trpc.ltiTypesConfigs.deleteLtiTypesConfig.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewLtiTypesConfigParams) => {
    if (editing) {
      updateLtiTypesConfig({ ...values, id: ltiTypesConfig.id });
    } else {
      createLtiTypesConfig(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
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
          name="typeId"
          render={({ field }) => (<FormItem>
              <FormLabel>Type Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (<FormItem>
              <FormLabel>Value</FormLabel>
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
            onClick={() => deleteLtiTypesConfig({ id: ltiTypesConfig.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default LtiTypesConfigForm;
