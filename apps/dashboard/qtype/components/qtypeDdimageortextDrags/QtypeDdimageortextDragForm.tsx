"use client";

import { QtypeDdimageortextDrag, NewQtypeDdimageortextDragParams, insertQtypeDdimageortextDragParams } from "@soco/qtype-db/schema/qtypeDdimageortextDrags";
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

const QtypeDdimageortextDragForm = ({
  qtypeDdimageortextDrag,
  closeModal,
}: {
  qtypeDdimageortextDrag?: QtypeDdimageortextDrag;
  closeModal?: () => void;
}) => {
  
  const editing = !!qtypeDdimageortextDrag?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQtypeDdimageortextDragParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQtypeDdimageortextDragParams),
    defaultValues: qtypeDdimageortextDrag ?? {
      dragGroup: "",
     infinite: false,
     label: "",
     no: 0,
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

    await utils.qtypeDdimageortextDrags.getQtypeDdimageortextDrags.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Qtype Ddimageortext Drag ${action}d!`);
  };

  const { mutate: createQtypeDdimageortextDrag, isLoading: isCreating } =
    trpc.qtypeDdimageortextDrags.createQtypeDdimageortextDrag.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQtypeDdimageortextDrag, isLoading: isUpdating } =
    trpc.qtypeDdimageortextDrags.updateQtypeDdimageortextDrag.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQtypeDdimageortextDrag, isLoading: isDeleting } =
    trpc.qtypeDdimageortextDrags.deleteQtypeDdimageortextDrag.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQtypeDdimageortextDragParams) => {
    if (editing) {
      updateQtypeDdimageortextDrag({ ...values, id: qtypeDdimageortextDrag.id });
    } else {
      createQtypeDdimageortextDrag(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="dragGroup"
          render={({ field }) => (<FormItem>
              <FormLabel>Drag Group</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
            onClick={() => deleteQtypeDdimageortextDrag({ id: qtypeDdimageortextDrag.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QtypeDdimageortextDragForm;
