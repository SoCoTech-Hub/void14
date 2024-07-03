"use client";

import { UserPasswordReset, NewUserPasswordResetParams, insertUserPasswordResetParams } from "@/lib/db/schema/userPasswordResets";
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

const UserPasswordResetForm = ({
  userPasswordReset,
  closeModal,
}: {
  userPasswordReset?: UserPasswordReset;
  closeModal?: () => void;
}) => {
  
  const editing = !!userPasswordReset?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertUserPasswordResetParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertUserPasswordResetParams),
    defaultValues: userPasswordReset ?? {
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

    await utils.userPasswordResets.getUserPasswordResets.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`User Password Reset ${action}d!`);
  };

  const { mutate: createUserPasswordReset, isLoading: isCreating } =
    trpc.userPasswordResets.createUserPasswordReset.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateUserPasswordReset, isLoading: isUpdating } =
    trpc.userPasswordResets.updateUserPasswordReset.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteUserPasswordReset, isLoading: isDeleting } =
    trpc.userPasswordResets.deleteUserPasswordReset.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewUserPasswordResetParams) => {
    if (editing) {
      updateUserPasswordReset({ ...values, id: userPasswordReset.id });
    } else {
      createUserPasswordReset(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
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
            onClick={() => deleteUserPasswordReset({ id: userPasswordReset.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default UserPasswordResetForm;
