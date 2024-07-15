"use client";

import { H5pContentsLibrary, NewH5pContentsLibraryParams, insertH5pContentsLibraryParams } from "@soco/h5p-db/schema/h5pContentsLibraries";
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

const H5pContentsLibraryForm = ({
  h5pContentsLibrary,
  closeModal,
}: {
  h5pContentsLibrary?: H5pContentsLibrary;
  closeModal?: () => void;
}) => {
  
  const editing = !!h5pContentsLibrary?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertH5pContentsLibraryParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertH5pContentsLibraryParams),
    defaultValues: h5pContentsLibrary ?? {
      dependencyType: "",
     dropCss: false,
     h5pId: "",
     libraryId: "",
     weight: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.h5pContentsLibraries.getH5pContentsLibraries.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`H5p Contents Library ${action}d!`);
  };

  const { mutate: createH5pContentsLibrary, isLoading: isCreating } =
    trpc.h5pContentsLibraries.createH5pContentsLibrary.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateH5pContentsLibrary, isLoading: isUpdating } =
    trpc.h5pContentsLibraries.updateH5pContentsLibrary.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteH5pContentsLibrary, isLoading: isDeleting } =
    trpc.h5pContentsLibraries.deleteH5pContentsLibrary.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewH5pContentsLibraryParams) => {
    if (editing) {
      updateH5pContentsLibrary({ ...values, id: h5pContentsLibrary.id });
    } else {
      createH5pContentsLibrary(values);
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
          name="dropCss"
          render={({ field }) => (<FormItem>
              <FormLabel>Drop Css</FormLabel>
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
          name="h5pId"
          render={({ field }) => (<FormItem>
              <FormLabel>H5p Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="libraryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Library Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (<FormItem>
              <FormLabel>Weight</FormLabel>
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
            onClick={() => deleteH5pContentsLibrary({ id: h5pContentsLibrary.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default H5pContentsLibraryForm;
