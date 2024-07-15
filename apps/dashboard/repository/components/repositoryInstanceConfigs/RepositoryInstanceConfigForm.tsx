"use client";

import { RepositoryInstanceConfig, NewRepositoryInstanceConfigParams, insertRepositoryInstanceConfigParams } from "@soco/repository-db/schema/repositoryInstanceConfigs";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const RepositoryInstanceConfigForm = ({
  repositoryInstanceConfig,
  closeModal,
}: {
  repositoryInstanceConfig?: RepositoryInstanceConfig;
  closeModal?: () => void;
}) => {
  const { data: repositoryInstances } = trpc.repositoryInstances.getRepositoryInstances.useQuery();
  const editing = !!repositoryInstanceConfig?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertRepositoryInstanceConfigParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertRepositoryInstanceConfigParams),
    defaultValues: repositoryInstanceConfig ?? {
      repositoryInstanceId: "",
     name: "",
     value: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.repositoryInstanceConfigs.getRepositoryInstanceConfigs.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Repository Instance Config ${action}d!`);
  };

  const { mutate: createRepositoryInstanceConfig, isLoading: isCreating } =
    trpc.repositoryInstanceConfigs.createRepositoryInstanceConfig.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateRepositoryInstanceConfig, isLoading: isUpdating } =
    trpc.repositoryInstanceConfigs.updateRepositoryInstanceConfig.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteRepositoryInstanceConfig, isLoading: isDeleting } =
    trpc.repositoryInstanceConfigs.deleteRepositoryInstanceConfig.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewRepositoryInstanceConfigParams) => {
    if (editing) {
      updateRepositoryInstanceConfig({ ...values, id: repositoryInstanceConfig.id });
    } else {
      createRepositoryInstanceConfig(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="repositoryInstanceId"
          render={({ field }) => (<FormItem>
              <FormLabel>Repository Instance Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a repository instance" />
                  </SelectTrigger>
                  <SelectContent>
                    {repositoryInstances?.repositoryInstances.map((repositoryInstance) => (
                      <SelectItem key={repositoryInstance.id} value={repositoryInstance.id.toString()}>
                        {repositoryInstance.id}  {/* TODO: Replace with a field from the repositoryInstance model */}
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
          name="value"
          render={({ field }) => (<FormItem>
              <FormLabel>Value</FormLabel>
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
            onClick={() => deleteRepositoryInstanceConfig({ id: repositoryInstanceConfig.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default RepositoryInstanceConfigForm;
