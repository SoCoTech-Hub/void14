"use client";

import { QtypeDdmarkerDrag, NewQtypeDdmarkerDragParams, insertQtypeDdmarkerDragParams } from "@/lib/db/schema/qtypeDdmarkerDrags";
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

const QtypeDdmarkerDragForm = ({
  qtypeDdmarkerDrag,
  closeModal,
}: {
  qtypeDdmarkerDrag?: QtypeDdmarkerDrag;
  closeModal?: () => void;
}) => {
  
  const editing = !!qtypeDdmarkerDrag?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQtypeDdmarkerDragParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQtypeDdmarkerDragParams),
    defaultValues: qtypeDdmarkerDrag ?? {
      infinite: false,
     label: "",
     no: 0,
     noOfDrags: 0,
     questionId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.qtypeDdmarkerDrags.getQtypeDdmarkerDrags.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Qtype Ddmarker Drag ${action}d!`);
  };

  const { mutate: createQtypeDdmarkerDrag, isLoading: isCreating } =
    trpc.qtypeDdmarkerDrags.createQtypeDdmarkerDrag.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQtypeDdmarkerDrag, isLoading: isUpdating } =
    trpc.qtypeDdmarkerDrags.updateQtypeDdmarkerDrag.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQtypeDdmarkerDrag, isLoading: isDeleting } =
    trpc.qtypeDdmarkerDrags.deleteQtypeDdmarkerDrag.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQtypeDdmarkerDragParams) => {
    if (editing) {
      updateQtypeDdmarkerDrag({ ...values, id: qtypeDdmarkerDrag.id });
    } else {
      createQtypeDdmarkerDrag(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="infinite"
          render={({ field }) => (<FormItem>
              <FormLabel>Infinite</FormLabel>
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
          name="label"
          render={({ field }) => (<FormItem>
              <FormLabel>Label</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="no"
          render={({ field }) => (<FormItem>
              <FormLabel>No</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="noOfDrags"
          render={({ field }) => (<FormItem>
              <FormLabel>No Of Drags</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="questionId"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Id</FormLabel>
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
            onClick={() => deleteQtypeDdmarkerDrag({ id: qtypeDdmarkerDrag.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QtypeDdmarkerDragForm;
