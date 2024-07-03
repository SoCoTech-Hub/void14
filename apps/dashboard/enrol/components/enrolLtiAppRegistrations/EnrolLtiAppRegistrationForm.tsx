"use client";

import { EnrolLtiAppRegistration, NewEnrolLtiAppRegistrationParams, insertEnrolLtiAppRegistrationParams } from "@/lib/db/schema/enrolLtiAppRegistrations";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EnrolLtiAppRegistrationForm = ({
  enrolLtiAppRegistration,
  closeModal,
}: {
  enrolLtiAppRegistration?: EnrolLtiAppRegistration;
  closeModal?: () => void;
}) => {
  
  const editing = !!enrolLtiAppRegistration?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEnrolLtiAppRegistrationParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEnrolLtiAppRegistrationParams),
    defaultValues: enrolLtiAppRegistration ?? {
      accessTokenUrl: "",
     authenticationRequestUrl: "",
     clientId: "",
     jwksUrl: "",
     name: "",
     platformClientHash: "",
     platformId: "",
     platformUniqueIdHash: "",
     status: false,
     uniqueId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.enrolLtiAppRegistrations.getEnrolLtiAppRegistrations.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Enrol Lti App Registration ${action}d!`);
  };

  const { mutate: createEnrolLtiAppRegistration, isLoading: isCreating } =
    trpc.enrolLtiAppRegistrations.createEnrolLtiAppRegistration.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEnrolLtiAppRegistration, isLoading: isUpdating } =
    trpc.enrolLtiAppRegistrations.updateEnrolLtiAppRegistration.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEnrolLtiAppRegistration, isLoading: isDeleting } =
    trpc.enrolLtiAppRegistrations.deleteEnrolLtiAppRegistration.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEnrolLtiAppRegistrationParams) => {
    if (editing) {
      updateEnrolLtiAppRegistration({ ...values, id: enrolLtiAppRegistration.id });
    } else {
      createEnrolLtiAppRegistration(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="accessTokenUrl"
          render={({ field }) => (<FormItem>
              <FormLabel>Access Token Url</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authenticationRequestUrl"
          render={({ field }) => (<FormItem>
              <FormLabel>Authentication Request Url</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (<FormItem>
              <FormLabel>Client Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jwksUrl"
          render={({ field }) => (<FormItem>
              <FormLabel>Jwks Url</FormLabel>
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
          name="platformClientHash"
          render={({ field }) => (<FormItem>
              <FormLabel>Platform Client Hash</FormLabel>
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
        <FormField
          control={form.control}
          name="platformUniqueIdHash"
          render={({ field }) => (<FormItem>
              <FormLabel>Platform Unique Id Hash</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (<FormItem>
              <FormLabel>Status</FormLabel>
                <br />
            <FormControl>
              <Checkbox {...field} checked={!!field.value} onCheckedChange={field.onChange} value={""} />
            </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="uniqueId"
          render={({ field }) => (<FormItem>
              <FormLabel>Unique Id</FormLabel>
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
            onClick={() => deleteEnrolLtiAppRegistration({ id: enrolLtiAppRegistration.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EnrolLtiAppRegistrationForm;
