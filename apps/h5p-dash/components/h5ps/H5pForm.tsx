"use client";

import { H5p, NewH5pParams, insertH5pParams } from "@/lib/db/schema/h5ps";
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

const H5pForm = ({
  h5p,
  closeModal,
}: {
  h5p?: H5p;
  closeModal?: () => void;
}) => {
  
  const editing = !!h5p?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertH5pParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertH5pParams),
    defaultValues: h5p ?? {
      contentHash: "",
     displayOptions: 0,
     filtered: "",
     jsonContent: "",
     mainLibraryId: "",
     pathNameHash: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.h5ps.getH5ps.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`H5p ${action}d!`);
  };

  const { mutate: createH5p, isLoading: isCreating } =
    trpc.h5ps.createH5p.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateH5p, isLoading: isUpdating } =
    trpc.h5ps.updateH5p.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteH5p, isLoading: isDeleting } =
    trpc.h5ps.deleteH5p.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewH5pParams) => {
    if (editing) {
      updateH5p({ ...values, id: h5p.id });
    } else {
      createH5p(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="contentHash"
          render={({ field }) => (<FormItem>
              <FormLabel>Content Hash</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayOptions"
          render={({ field }) => (<FormItem>
              <FormLabel>Display Options</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="filtered"
          render={({ field }) => (<FormItem>
              <FormLabel>Filtered</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jsonContent"
          render={({ field }) => (<FormItem>
              <FormLabel>Json Content</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mainLibraryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Main Library Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pathNameHash"
          render={({ field }) => (<FormItem>
              <FormLabel>Path Name Hash</FormLabel>
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
            onClick={() => deleteH5p({ id: h5p.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default H5pForm;
