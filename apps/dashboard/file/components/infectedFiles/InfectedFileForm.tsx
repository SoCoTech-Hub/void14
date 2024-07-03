"use client";

import { InfectedFile, NewInfectedFileParams, insertInfectedFileParams } from "@/lib/db/schema/infectedFiles";
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

const InfectedFileForm = ({
  infectedFile,
  closeModal,
}: {
  infectedFile?: InfectedFile;
  closeModal?: () => void;
}) => {
  
  const editing = !!infectedFile?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertInfectedFileParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertInfectedFileParams),
    defaultValues: infectedFile ?? {
      fileName: "",
     quarantinedFile: "",
     reason: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.infectedFiles.getInfectedFiles.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Infected File ${action}d!`);
  };

  const { mutate: createInfectedFile, isLoading: isCreating } =
    trpc.infectedFiles.createInfectedFile.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateInfectedFile, isLoading: isUpdating } =
    trpc.infectedFiles.updateInfectedFile.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteInfectedFile, isLoading: isDeleting } =
    trpc.infectedFiles.deleteInfectedFile.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewInfectedFileParams) => {
    if (editing) {
      updateInfectedFile({ ...values, id: infectedFile.id });
    } else {
      createInfectedFile(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="fileName"
          render={({ field }) => (<FormItem>
              <FormLabel>File Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quarantinedFile"
          render={({ field }) => (<FormItem>
              <FormLabel>Quarantined File</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (<FormItem>
              <FormLabel>Reason</FormLabel>
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
            onClick={() => deleteInfectedFile({ id: infectedFile.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default InfectedFileForm;
