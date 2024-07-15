"use client";

import { EnrolLtiLti2UserResult, NewEnrolLtiLti2UserResultParams, insertEnrolLtiLti2UserResultParams } from "@soco/enrol-db/schema/enrolLtiLti2UserResults";
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

const EnrolLtiLti2UserResultForm = ({
  enrolLtiLti2UserResult,
  closeModal,
}: {
  enrolLtiLti2UserResult?: EnrolLtiLti2UserResult;
  closeModal?: () => void;
}) => {
  
  const editing = !!enrolLtiLti2UserResult?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEnrolLtiLti2UserResultParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEnrolLtiLti2UserResultParams),
    defaultValues: enrolLtiLti2UserResult ?? {
      ltiResultSourcedId: "",
     ltiUserKey: "",
     resourceLinkId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.enrolLtiLti2UserResults.getEnrolLtiLti2UserResults.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Enrol Lti Lti2 User Result ${action}d!`);
  };

  const { mutate: createEnrolLtiLti2UserResult, isLoading: isCreating } =
    trpc.enrolLtiLti2UserResults.createEnrolLtiLti2UserResult.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEnrolLtiLti2UserResult, isLoading: isUpdating } =
    trpc.enrolLtiLti2UserResults.updateEnrolLtiLti2UserResult.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEnrolLtiLti2UserResult, isLoading: isDeleting } =
    trpc.enrolLtiLti2UserResults.deleteEnrolLtiLti2UserResult.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEnrolLtiLti2UserResultParams) => {
    if (editing) {
      updateEnrolLtiLti2UserResult({ ...values, id: enrolLtiLti2UserResult.id });
    } else {
      createEnrolLtiLti2UserResult(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="ltiResultSourcedId"
          render={({ field }) => (<FormItem>
              <FormLabel>Lti Result Sourced Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ltiUserKey"
          render={({ field }) => (<FormItem>
              <FormLabel>Lti User Key</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resourceLinkId"
          render={({ field }) => (<FormItem>
              <FormLabel>Resource Link Id</FormLabel>
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
            onClick={() => deleteEnrolLtiLti2UserResult({ id: enrolLtiLti2UserResult.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EnrolLtiLti2UserResultForm;
