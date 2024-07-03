"use client";

import { RepositoryInstance, NewRepositoryInstanceParams, insertRepositoryInstanceParams } from "@/lib/db/schema/repositoryInstances";
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

const RepositoryInstanceForm = ({
  repositoryInstance,
  closeModal,
}: {
  repositoryInstance?: RepositoryInstance;
  closeModal?: () => void;
}) => {
  
  const editing = !!repositoryInstance?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertRepositoryInstanceParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertRepositoryInstanceParams),
    defaultValues: repositoryInstance ?? {
      contextId: "",
     name: "",
     password: "",
     readOnly: false,
     typeId: "",
     userName: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.repositoryInstances.getRepositoryInstances.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Repository Instance ${action}d!`);
  };

  const { mutate: createRepositoryInstance, isLoading: isCreating } =
    trpc.repositoryInstances.createRepositoryInstance.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateRepositoryInstance, isLoading: isUpdating } =
    trpc.repositoryInstances.updateRepositoryInstance.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteRepositoryInstance, isLoading: isDeleting } =
    trpc.repositoryInstances.deleteRepositoryInstance.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewRepositoryInstanceParams) => {
    if (editing) {
      updateRepositoryInstance({ ...values, id: repositoryInstance.id });
    } else {
      createRepositoryInstance(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
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
          name="password"
          render={({ field }) => (<FormItem>
              <FormLabel>Password</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="readOnly"
          render={({ field }) => (<FormItem>
              <FormLabel>Read Only</FormLabel>
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
          name="typeId"
          render={({ field }) => (<FormItem>
              <FormLabel>Type Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (<FormItem>
              <FormLabel>User Name</FormLabel>
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
            onClick={() => deleteRepositoryInstance({ id: repositoryInstance.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default RepositoryInstanceForm;
