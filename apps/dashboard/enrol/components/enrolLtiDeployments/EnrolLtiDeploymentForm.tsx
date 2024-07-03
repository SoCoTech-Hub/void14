"use client";

import { EnrolLtiDeployment, NewEnrolLtiDeploymentParams, insertEnrolLtiDeploymentParams } from "@/lib/db/schema/enrolLtiDeployments";
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

const EnrolLtiDeploymentForm = ({
  enrolLtiDeployment,
  closeModal,
}: {
  enrolLtiDeployment?: EnrolLtiDeployment;
  closeModal?: () => void;
}) => {
  
  const editing = !!enrolLtiDeployment?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEnrolLtiDeploymentParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEnrolLtiDeploymentParams),
    defaultValues: enrolLtiDeployment ?? {
      deploymentId: "",
     legacyConsumerKey: "",
     name: "",
     platformId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.enrolLtiDeployments.getEnrolLtiDeployments.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Enrol Lti Deployment ${action}d!`);
  };

  const { mutate: createEnrolLtiDeployment, isLoading: isCreating } =
    trpc.enrolLtiDeployments.createEnrolLtiDeployment.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEnrolLtiDeployment, isLoading: isUpdating } =
    trpc.enrolLtiDeployments.updateEnrolLtiDeployment.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEnrolLtiDeployment, isLoading: isDeleting } =
    trpc.enrolLtiDeployments.deleteEnrolLtiDeployment.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEnrolLtiDeploymentParams) => {
    if (editing) {
      updateEnrolLtiDeployment({ ...values, id: enrolLtiDeployment.id });
    } else {
      createEnrolLtiDeployment(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="deploymentId"
          render={({ field }) => (<FormItem>
              <FormLabel>Deployment Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="legacyConsumerKey"
          render={({ field }) => (<FormItem>
              <FormLabel>Legacy Consumer Key</FormLabel>
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
          name="platformId"
          render={({ field }) => (<FormItem>
              <FormLabel>Platform Id</FormLabel>
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
            onClick={() => deleteEnrolLtiDeployment({ id: enrolLtiDeployment.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EnrolLtiDeploymentForm;
