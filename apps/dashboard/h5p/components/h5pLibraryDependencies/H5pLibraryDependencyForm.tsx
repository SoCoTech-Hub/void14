"use client";

import { H5pLibraryDependency, NewH5pLibraryDependencyParams, insertH5pLibraryDependencyParams } from "@soco/h5p-db/schema/h5pLibraryDependencies";
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

const H5pLibraryDependencyForm = ({
  h5pLibraryDependency,
  closeModal,
}: {
  h5pLibraryDependency?: H5pLibraryDependency;
  closeModal?: () => void;
}) => {
  const { data: h5pLibraries } = trpc.h5pLibraries.getH5pLibraries.useQuery();
  const editing = !!h5pLibraryDependency?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertH5pLibraryDependencyParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertH5pLibraryDependencyParams),
    defaultValues: h5pLibraryDependency ?? {
      dependencyType: "",
     h5pLibraryId: "",
     requiredLibraryId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.h5pLibraryDependencies.getH5pLibraryDependencies.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`H5p Library Dependency ${action}d!`);
  };

  const { mutate: createH5pLibraryDependency, isLoading: isCreating } =
    trpc.h5pLibraryDependencies.createH5pLibraryDependency.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateH5pLibraryDependency, isLoading: isUpdating } =
    trpc.h5pLibraryDependencies.updateH5pLibraryDependency.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteH5pLibraryDependency, isLoading: isDeleting } =
    trpc.h5pLibraryDependencies.deleteH5pLibraryDependency.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewH5pLibraryDependencyParams) => {
    if (editing) {
      updateH5pLibraryDependency({ ...values, id: h5pLibraryDependency.id });
    } else {
      createH5pLibraryDependency(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="dependencyType"
          render={({ field }) => (<FormItem>
              <FormLabel>Dependency Type</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="h5pLibraryId"
          render={({ field }) => (<FormItem>
              <FormLabel>H5p Library Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a h5p library" />
                  </SelectTrigger>
                  <SelectContent>
                    {h5pLibraries?.h5pLibraries.map((h5pLibrary) => (
                      <SelectItem key={h5pLibrary.id} value={h5pLibrary.id.toString()}>
                        {h5pLibrary.id}  {/* TODO: Replace with a field from the h5pLibrary model */}
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
          name="requiredLibraryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Required Library Id</FormLabel>
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
            onClick={() => deleteH5pLibraryDependency({ id: h5pLibraryDependency.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default H5pLibraryDependencyForm;
