"use client";

import { EnrolLtiLti2ResourceLink, NewEnrolLtiLti2ResourceLinkParams, insertEnrolLtiLti2ResourceLinkParams } from "@soco/enrol-db/schema/enrolLtiLti2ResourceLinks";
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

const EnrolLtiLti2ResourceLinkForm = ({
  enrolLtiLti2ResourceLink,
  closeModal,
}: {
  enrolLtiLti2ResourceLink?: EnrolLtiLti2ResourceLink;
  closeModal?: () => void;
}) => {
  
  const editing = !!enrolLtiLti2ResourceLink?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEnrolLtiLti2ResourceLinkParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEnrolLtiLti2ResourceLinkParams),
    defaultValues: enrolLtiLti2ResourceLink ?? {
      consumerId: "",
     contextId: "",
     ltiResourceLinkKey: "",
     primaryResourceLinkId: "",
     settings: "",
     shareApproved: false
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.enrolLtiLti2ResourceLinks.getEnrolLtiLti2ResourceLinks.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Enrol Lti Lti2 Resource Link ${action}d!`);
  };

  const { mutate: createEnrolLtiLti2ResourceLink, isLoading: isCreating } =
    trpc.enrolLtiLti2ResourceLinks.createEnrolLtiLti2ResourceLink.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEnrolLtiLti2ResourceLink, isLoading: isUpdating } =
    trpc.enrolLtiLti2ResourceLinks.updateEnrolLtiLti2ResourceLink.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEnrolLtiLti2ResourceLink, isLoading: isDeleting } =
    trpc.enrolLtiLti2ResourceLinks.deleteEnrolLtiLti2ResourceLink.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEnrolLtiLti2ResourceLinkParams) => {
    if (editing) {
      updateEnrolLtiLti2ResourceLink({ ...values, id: enrolLtiLti2ResourceLink.id });
    } else {
      createEnrolLtiLti2ResourceLink(values);
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
          name="ltiResourceLinkKey"
          render={({ field }) => (<FormItem>
              <FormLabel>Lti Resource Link Key</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="primaryResourceLinkId"
          render={({ field }) => (<FormItem>
              <FormLabel>Primary Resource Link Id</FormLabel>
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
          name="shareApproved"
          render={({ field }) => (<FormItem>
              <FormLabel>Share Approved</FormLabel>
                <br />
            <FormControl>
              <Checkbox {...field} checked={!!field.value} onCheckedChange={field.onChange} value={""} />
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
            onClick={() => deleteEnrolLtiLti2ResourceLink({ id: enrolLtiLti2ResourceLink.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EnrolLtiLti2ResourceLinkForm;
