"use client";

import { GradeImportNewitem, NewGradeImportNewitemParams, insertGradeImportNewitemParams } from "@soco/grade-db/schema/gradeImportNewitems";
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

const GradeImportNewitemForm = ({
  gradeImportNewitem,
  closeModal,
}: {
  gradeImportNewitem?: GradeImportNewitem;
  closeModal?: () => void;
}) => {
  
  const editing = !!gradeImportNewitem?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGradeImportNewitemParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGradeImportNewitemParams),
    defaultValues: gradeImportNewitem ?? {
      importCode: "",
     importer: "",
     itemName: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.gradeImportNewitems.getGradeImportNewitems.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Grade Import Newitem ${action}d!`);
  };

  const { mutate: createGradeImportNewitem, isLoading: isCreating } =
    trpc.gradeImportNewitems.createGradeImportNewitem.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGradeImportNewitem, isLoading: isUpdating } =
    trpc.gradeImportNewitems.updateGradeImportNewitem.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGradeImportNewitem, isLoading: isDeleting } =
    trpc.gradeImportNewitems.deleteGradeImportNewitem.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGradeImportNewitemParams) => {
    if (editing) {
      updateGradeImportNewitem({ ...values, id: gradeImportNewitem.id });
    } else {
      createGradeImportNewitem(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="importCode"
          render={({ field }) => (<FormItem>
              <FormLabel>Import Code</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="importer"
          render={({ field }) => (<FormItem>
              <FormLabel>Importer</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (<FormItem>
              <FormLabel>Item Name</FormLabel>
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
            onClick={() => deleteGradeImportNewitem({ id: gradeImportNewitem.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GradeImportNewitemForm;
