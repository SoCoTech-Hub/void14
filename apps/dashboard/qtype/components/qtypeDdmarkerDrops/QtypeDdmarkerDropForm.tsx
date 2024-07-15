"use client";

import { QtypeDdmarkerDrop, NewQtypeDdmarkerDropParams, insertQtypeDdmarkerDropParams } from "@soco/qtype-db/schema/qtypeDdmarkerDrops";
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

const QtypeDdmarkerDropForm = ({
  qtypeDdmarkerDrop,
  closeModal,
}: {
  qtypeDdmarkerDrop?: QtypeDdmarkerDrop;
  closeModal?: () => void;
}) => {
  
  const editing = !!qtypeDdmarkerDrop?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQtypeDdmarkerDropParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQtypeDdmarkerDropParams),
    defaultValues: qtypeDdmarkerDrop ?? {
      choice: 0,
     coords: "",
     no: 0,
     questionId: "",
     shape: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.qtypeDdmarkerDrops.getQtypeDdmarkerDrops.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Qtype Ddmarker Drop ${action}d!`);
  };

  const { mutate: createQtypeDdmarkerDrop, isLoading: isCreating } =
    trpc.qtypeDdmarkerDrops.createQtypeDdmarkerDrop.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQtypeDdmarkerDrop, isLoading: isUpdating } =
    trpc.qtypeDdmarkerDrops.updateQtypeDdmarkerDrop.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQtypeDdmarkerDrop, isLoading: isDeleting } =
    trpc.qtypeDdmarkerDrops.deleteQtypeDdmarkerDrop.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQtypeDdmarkerDropParams) => {
    if (editing) {
      updateQtypeDdmarkerDrop({ ...values, id: qtypeDdmarkerDrop.id });
    } else {
      createQtypeDdmarkerDrop(values);
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
          name="coords"
          render={({ field }) => (<FormItem>
              <FormLabel>Coords</FormLabel>
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
          name="shape"
          render={({ field }) => (<FormItem>
              <FormLabel>Shape</FormLabel>
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
            onClick={() => deleteQtypeDdmarkerDrop({ id: qtypeDdmarkerDrop.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QtypeDdmarkerDropForm;
