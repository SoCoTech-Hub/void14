"use client";

import { QtypeDdimageortextDrop, NewQtypeDdimageortextDropParams, insertQtypeDdimageortextDropParams } from "@/lib/db/schema/qtypeDdimageortextDrops";
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

const QtypeDdimageortextDropForm = ({
  qtypeDdimageortextDrop,
  closeModal,
}: {
  qtypeDdimageortextDrop?: QtypeDdimageortextDrop;
  closeModal?: () => void;
}) => {
  
  const editing = !!qtypeDdimageortextDrop?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQtypeDdimageortextDropParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQtypeDdimageortextDropParams),
    defaultValues: qtypeDdimageortextDrop ?? {
      choice: 0,
     label: "",
     no: 0,
     questionId: "",
     xLeft: 0,
     yTop: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.qtypeDdimageortextDrops.getQtypeDdimageortextDrops.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Qtype Ddimageortext Drop ${action}d!`);
  };

  const { mutate: createQtypeDdimageortextDrop, isLoading: isCreating } =
    trpc.qtypeDdimageortextDrops.createQtypeDdimageortextDrop.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQtypeDdimageortextDrop, isLoading: isUpdating } =
    trpc.qtypeDdimageortextDrops.updateQtypeDdimageortextDrop.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQtypeDdimageortextDrop, isLoading: isDeleting } =
    trpc.qtypeDdimageortextDrops.deleteQtypeDdimageortextDrop.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQtypeDdimageortextDropParams) => {
    if (editing) {
      updateQtypeDdimageortextDrop({ ...values, id: qtypeDdimageortextDrop.id });
    } else {
      createQtypeDdimageortextDrop(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="choice"
          render={({ field }) => (<FormItem>
              <FormLabel>Choice</FormLabel>
                <FormControl>
            <Input {...field} />
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
        <FormField
          control={form.control}
          name="xLeft"
          render={({ field }) => (<FormItem>
              <FormLabel>X Left</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="yTop"
          render={({ field }) => (<FormItem>
              <FormLabel>Y Top</FormLabel>
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
            onClick={() => deleteQtypeDdimageortextDrop({ id: qtypeDdimageortextDrop.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QtypeDdimageortextDropForm;
