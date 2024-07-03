"use client";

import { EnrolLtiContext, NewEnrolLtiContextParams, insertEnrolLtiContextParams } from "@/lib/db/schema/enrolLtiContexts";
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

const EnrolLtiContextForm = ({
  enrolLtiContext,
  closeModal,
}: {
  enrolLtiContext?: EnrolLtiContext;
  closeModal?: () => void;
}) => {
  
  const editing = !!enrolLtiContext?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEnrolLtiContextParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEnrolLtiContextParams),
    defaultValues: enrolLtiContext ?? {
      contextId: "",
     ltiDeploymentId: "",
     type: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.enrolLtiContexts.getEnrolLtiContexts.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Enrol Lti Context ${action}d!`);
  };

  const { mutate: createEnrolLtiContext, isLoading: isCreating } =
    trpc.enrolLtiContexts.createEnrolLtiContext.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEnrolLtiContext, isLoading: isUpdating } =
    trpc.enrolLtiContexts.updateEnrolLtiContext.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEnrolLtiContext, isLoading: isDeleting } =
    trpc.enrolLtiContexts.deleteEnrolLtiContext.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEnrolLtiContextParams) => {
    if (editing) {
      updateEnrolLtiContext({ ...values, id: enrolLtiContext.id });
    } else {
      createEnrolLtiContext(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="contextId"
          render={({ field }) => (<FormItem>
              <FormLabel>Context Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ltiDeploymentId"
          render={({ field }) => (<FormItem>
              <FormLabel>Lti Deployment Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (<FormItem>
              <FormLabel>Type</FormLabel>
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
            onClick={() => deleteEnrolLtiContext({ id: enrolLtiContext.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EnrolLtiContextForm;
