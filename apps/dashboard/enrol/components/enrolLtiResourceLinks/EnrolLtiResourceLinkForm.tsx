"use client";

import { EnrolLtiResourceLink, NewEnrolLtiResourceLinkParams, insertEnrolLtiResourceLinkParams } from "@soco/enrol-db/schema/enrolLtiResourceLinks";
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

const EnrolLtiResourceLinkForm = ({
  enrolLtiResourceLink,
  closeModal,
}: {
  enrolLtiResourceLink?: EnrolLtiResourceLink;
  closeModal?: () => void;
}) => {
  
  const editing = !!enrolLtiResourceLink?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEnrolLtiResourceLinkParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEnrolLtiResourceLinkParams),
    defaultValues: enrolLtiResourceLink ?? {
      contextMembershipsUrl: "",
     lineItemScope: "",
     lineItemService: "",
     lineItemsService: "",
     ltiContextId: "",
     ltiDeploymentId: "",
     nrpsServiceVersions: "",
     resourceId: "",
     resourceLinkId: "",
     resultScope: "",
     scoreScope: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.enrolLtiResourceLinks.getEnrolLtiResourceLinks.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Enrol Lti Resource Link ${action}d!`);
  };

  const { mutate: createEnrolLtiResourceLink, isLoading: isCreating } =
    trpc.enrolLtiResourceLinks.createEnrolLtiResourceLink.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEnrolLtiResourceLink, isLoading: isUpdating } =
    trpc.enrolLtiResourceLinks.updateEnrolLtiResourceLink.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEnrolLtiResourceLink, isLoading: isDeleting } =
    trpc.enrolLtiResourceLinks.deleteEnrolLtiResourceLink.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEnrolLtiResourceLinkParams) => {
    if (editing) {
      updateEnrolLtiResourceLink({ ...values, id: enrolLtiResourceLink.id });
    } else {
      createEnrolLtiResourceLink(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="contextMembershipsUrl"
          render={({ field }) => (<FormItem>
              <FormLabel>Context Memberships Url</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lineItemScope"
          render={({ field }) => (<FormItem>
              <FormLabel>Line Item Scope</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lineItemService"
          render={({ field }) => (<FormItem>
              <FormLabel>Line Item Service</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lineItemsService"
          render={({ field }) => (<FormItem>
              <FormLabel>Line Items Service</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ltiContextId"
          render={({ field }) => (<FormItem>
              <FormLabel>Lti Context Id</FormLabel>
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
          name="nrpsServiceVersions"
          render={({ field }) => (<FormItem>
              <FormLabel>Nrps Service Versions</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resourceId"
          render={({ field }) => (<FormItem>
              <FormLabel>Resource Id</FormLabel>
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
        <FormField
          control={form.control}
          name="resultScope"
          render={({ field }) => (<FormItem>
              <FormLabel>Result Scope</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scoreScope"
          render={({ field }) => (<FormItem>
              <FormLabel>Score Scope</FormLabel>
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
            onClick={() => deleteEnrolLtiResourceLink({ id: enrolLtiResourceLink.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EnrolLtiResourceLinkForm;
