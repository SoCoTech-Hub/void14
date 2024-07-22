"use client";

import { EnrolLtiUserResourceLink, NewEnrolLtiUserResourceLinkParams, insertEnrolLtiUserResourceLinkParams } from "@soco/enrol-db/schema/enrolLtiUserResourceLinks";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@soco/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EnrolLtiUserResourceLinkForm = ({
  enrolLtiUserResourceLink,
  closeModal,
}: {
  enrolLtiUserResourceLink?: EnrolLtiUserResourceLink;
  closeModal?: () => void;
}) => {
  const { data: enrolLtiUsers } = trpc.enrolLtiUsers.getEnrolLtiUsers.useQuery();
  const { data: enrolLtiResourceLinks } = trpc.enrolLtiResourceLinks.getEnrolLtiResourceLinks.useQuery();
  const editing = !!enrolLtiUserResourceLink?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEnrolLtiUserResourceLinkParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEnrolLtiUserResourceLinkParams),
    defaultValues: enrolLtiUserResourceLink ?? {
      enrolLtiUserId: "",
     enrolLtiResourceLinkId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.enrolLtiUserResourceLinks.getEnrolLtiUserResourceLinks.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Enrol Lti User Resource Link ${action}d!`);
  };

  const { mutate: createEnrolLtiUserResourceLink, isLoading: isCreating } =
    trpc.enrolLtiUserResourceLinks.createEnrolLtiUserResourceLink.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEnrolLtiUserResourceLink, isLoading: isUpdating } =
    trpc.enrolLtiUserResourceLinks.updateEnrolLtiUserResourceLink.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEnrolLtiUserResourceLink, isLoading: isDeleting } =
    trpc.enrolLtiUserResourceLinks.deleteEnrolLtiUserResourceLink.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEnrolLtiUserResourceLinkParams) => {
    if (editing) {
      updateEnrolLtiUserResourceLink({ ...values, id: enrolLtiUserResourceLink.id });
    } else {
      createEnrolLtiUserResourceLink(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="enrolLtiUserId"
          render={({ field }) => (<FormItem>
              <FormLabel>Enrol Lti User Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a enrol lti user" />
                  </SelectTrigger>
                  <SelectContent>
                    {enrolLtiUsers?.enrolLtiUsers.map((enrolLtiUser) => (
                      <SelectItem key={enrolLtiUser.enrolLtiUser.id} value={enrolLtiUser.enrolLtiUser.id.toString()}>
                        {enrolLtiUser.enrolLtiUser.id}  {/* TODO: Replace with a field from the enrolLtiUser model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enrolLtiResourceLinkId"
          render={({ field }) => (<FormItem>
              <FormLabel>Enrol Lti Resource Link Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a enrol lti resource link" />
                  </SelectTrigger>
                  <SelectContent>
                    {enrolLtiResourceLinks?.enrolLtiResourceLinks.map((enrolLtiResourceLink) => (
                      <SelectItem key={enrolLtiResourceLink.id} value={enrolLtiResourceLink.id.toString()}>
                        {enrolLtiResourceLink.id}  {/* TODO: Replace with a field from the enrolLtiResourceLink model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            onClick={() => deleteEnrolLtiUserResourceLink({ id: enrolLtiUserResourceLink.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EnrolLtiUserResourceLinkForm;
