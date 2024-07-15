"use client";

import { EnrolLtiLti2Context, NewEnrolLtiLti2ContextParams, insertEnrolLtiLti2ContextParams } from "@soco/enrol-db/schema/enrolLtiLti2Contexts";
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

const EnrolLtiLti2ContextForm = ({
  enrolLtiLti2Context,
  closeModal,
}: {
  enrolLtiLti2Context?: EnrolLtiLti2Context;
  closeModal?: () => void;
}) => {
  
  const editing = !!enrolLtiLti2Context?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEnrolLtiLti2ContextParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEnrolLtiLti2ContextParams),
    defaultValues: enrolLtiLti2Context ?? {
      consumerId: "",
     settings: "",
     ltiContextKey: "",
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

    await utils.enrolLtiLti2Contexts.getEnrolLtiLti2Contexts.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Enrol Lti Lti2 Context ${action}d!`);
  };

  const { mutate: createEnrolLtiLti2Context, isLoading: isCreating } =
    trpc.enrolLtiLti2Contexts.createEnrolLtiLti2Context.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEnrolLtiLti2Context, isLoading: isUpdating } =
    trpc.enrolLtiLti2Contexts.updateEnrolLtiLti2Context.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEnrolLtiLti2Context, isLoading: isDeleting } =
    trpc.enrolLtiLti2Contexts.deleteEnrolLtiLti2Context.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEnrolLtiLti2ContextParams) => {
    if (editing) {
      updateEnrolLtiLti2Context({ ...values, id: enrolLtiLti2Context.id });
    } else {
      createEnrolLtiLti2Context(values);
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
          name="settings"
          render={({ field }) => (<FormItem>
              <FormLabel>Settings</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ltiContextKey"
          render={({ field }) => (<FormItem>
              <FormLabel>Lti Context Key</FormLabel>
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
            onClick={() => deleteEnrolLtiLti2Context({ id: enrolLtiLti2Context.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EnrolLtiLti2ContextForm;
