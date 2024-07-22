"use client";

import { RoleContextLevel, NewRoleContextLevelParams, insertRoleContextLevelParams } from "@soco/role-db/schema/roleContextLevels";
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

const RoleContextLevelForm = ({
  roleContextLevel,
  closeModal,
}: {
  roleContextLevel?: RoleContextLevel;
  closeModal?: () => void;
}) => {
  const { data: roles } = trpc.roles.getRoles.useQuery();
  const editing = !!roleContextLevel?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertRoleContextLevelParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertRoleContextLevelParams),
    defaultValues: roleContextLevel ?? {
      contextLevel: "",
     roleId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.roleContextLevels.getRoleContextLevels.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Role Context Level ${action}d!`);
  };

  const { mutate: createRoleContextLevel, isLoading: isCreating } =
    trpc.roleContextLevels.createRoleContextLevel.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateRoleContextLevel, isLoading: isUpdating } =
    trpc.roleContextLevels.updateRoleContextLevel.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteRoleContextLevel, isLoading: isDeleting } =
    trpc.roleContextLevels.deleteRoleContextLevel.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewRoleContextLevelParams) => {
    if (editing) {
      updateRoleContextLevel({ ...values, id: roleContextLevel.id });
    } else {
      createRoleContextLevel(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="contextLevel"
          render={({ field }) => (<FormItem>
              <FormLabel>Context Level</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (<FormItem>
              <FormLabel>Role Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles?.roles.map((role) => (
                      <SelectItem key={role.id} value={role.id.toString()}>
                        {role.id}  {/* TODO: Replace with a field from the role model */}
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
            onClick={() => deleteRoleContextLevel({ id: roleContextLevel.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default RoleContextLevelForm;
