"use client";

import { H5pLibrariesCachedasset, NewH5pLibrariesCachedassetParams, insertH5pLibrariesCachedassetParams } from "@soco/h5p-db/schema/h5pLibrariesCachedassets";
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

const H5pLibrariesCachedassetForm = ({
  h5pLibrariesCachedasset,
  closeModal,
}: {
  h5pLibrariesCachedasset?: H5pLibrariesCachedasset;
  closeModal?: () => void;
}) => {
  const { data: h5pLibraries } = trpc.h5pLibraries.getH5pLibraries.useQuery();
  const editing = !!h5pLibrariesCachedasset?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertH5pLibrariesCachedassetParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertH5pLibrariesCachedassetParams),
    defaultValues: h5pLibrariesCachedasset ?? {
      hash: "",
     h5pLibraryId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.h5pLibrariesCachedassets.getH5pLibrariesCachedassets.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`H5p Libraries Cachedasset ${action}d!`);
  };

  const { mutate: createH5pLibrariesCachedasset, isLoading: isCreating } =
    trpc.h5pLibrariesCachedassets.createH5pLibrariesCachedasset.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateH5pLibrariesCachedasset, isLoading: isUpdating } =
    trpc.h5pLibrariesCachedassets.updateH5pLibrariesCachedasset.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteH5pLibrariesCachedasset, isLoading: isDeleting } =
    trpc.h5pLibrariesCachedassets.deleteH5pLibrariesCachedasset.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewH5pLibrariesCachedassetParams) => {
    if (editing) {
      updateH5pLibrariesCachedasset({ ...values, id: h5pLibrariesCachedasset.id });
    } else {
      createH5pLibrariesCachedasset(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="hash"
          render={({ field }) => (<FormItem>
              <FormLabel>Hash</FormLabel>
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
            onClick={() => deleteH5pLibrariesCachedasset({ id: h5pLibrariesCachedasset.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default H5pLibrariesCachedassetForm;
