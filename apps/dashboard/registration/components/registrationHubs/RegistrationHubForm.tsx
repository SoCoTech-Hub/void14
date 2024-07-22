"use client";

import { RegistrationHub, NewRegistrationHubParams, insertRegistrationHubParams } from "@soco/registration-db/schema/registrationHubs";
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

const RegistrationHubForm = ({
  registrationHub,
  closeModal,
}: {
  registrationHub?: RegistrationHub;
  closeModal?: () => void;
}) => {
  
  const editing = !!registrationHub?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertRegistrationHubParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertRegistrationHubParams),
    defaultValues: registrationHub ?? {
      confirmed: false,
     hubName: "",
     hubUrl: "",
     secret: "",
     token: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.registrationHubs.getRegistrationHubs.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Registration Hub ${action}d!`);
  };

  const { mutate: createRegistrationHub, isLoading: isCreating } =
    trpc.registrationHubs.createRegistrationHub.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateRegistrationHub, isLoading: isUpdating } =
    trpc.registrationHubs.updateRegistrationHub.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteRegistrationHub, isLoading: isDeleting } =
    trpc.registrationHubs.deleteRegistrationHub.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewRegistrationHubParams) => {
    if (editing) {
      updateRegistrationHub({ ...values, id: registrationHub.id });
    } else {
      createRegistrationHub(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="confirmed"
          render={({ field }) => (<FormItem>
              <FormLabel>Confirmed</FormLabel>
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
          name="hubName"
          render={({ field }) => (<FormItem>
              <FormLabel>Hub Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hubUrl"
          render={({ field }) => (<FormItem>
              <FormLabel>Hub Url</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="secret"
          render={({ field }) => (<FormItem>
              <FormLabel>Secret</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (<FormItem>
              <FormLabel>Token</FormLabel>
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
            onClick={() => deleteRegistrationHub({ id: registrationHub.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default RegistrationHubForm;
