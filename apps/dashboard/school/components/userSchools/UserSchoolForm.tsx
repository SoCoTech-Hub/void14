"use client";

import { UserSchool, NewUserSchoolParams, insertUserSchoolParams } from "@soco/school-db/schema/userSchools";
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

const UserSchoolForm = ({
  userSchool,
  closeModal,
}: {
  userSchool?: UserSchool;
  closeModal?: () => void;
}) => {
  const { data: schools } = trpc.schools.getSchools.useQuery();
  const editing = !!userSchool?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertUserSchoolParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertUserSchoolParams),
    defaultValues: userSchool ?? {
      schoolId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.userSchools.getUserSchools.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`User School ${action}d!`);
  };

  const { mutate: createUserSchool, isLoading: isCreating } =
    trpc.userSchools.createUserSchool.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateUserSchool, isLoading: isUpdating } =
    trpc.userSchools.updateUserSchool.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteUserSchool, isLoading: isDeleting } =
    trpc.userSchools.deleteUserSchool.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewUserSchoolParams) => {
    if (editing) {
      updateUserSchool({ ...values, id: userSchool.id });
    } else {
      createUserSchool(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="schoolId"
          render={({ field }) => (<FormItem>
              <FormLabel>School Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a school" />
                  </SelectTrigger>
                  <SelectContent>
                    {schools?.schools.map((school) => (
                      <SelectItem key={school.school.id} value={school.school.id.toString()}>
                        {school.school.id}  {/* TODO: Replace with a field from the school model */}
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
            onClick={() => deleteUserSchool({ id: userSchool.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default UserSchoolForm;
