"use client";

import { CustomFieldData, NewCustomFieldDataParams, insertCustomFieldDataParams } from "@soco/custom-field-db/schema/customFieldDatas";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CustomFieldDataForm = ({
  customFieldData,
  closeModal,
}: {
  customFieldData?: CustomFieldData;
  closeModal?: () => void;
}) => {
  
  const editing = !!customFieldData?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertCustomFieldDataParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertCustomFieldDataParams),
    defaultValues: customFieldData ?? {
      charValue: "",
     contextId: "",
     decValue: 0.0,
     fieldId: "",
     instanceId: "",
     intValue: 0,
     shortCharValue: "",
     value: "",
     valueFormat: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.customFieldDatas.getCustomFieldDatas.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Custom Field Data ${action}d!`);
  };

  const { mutate: createCustomFieldData, isLoading: isCreating } =
    trpc.customFieldDatas.createCustomFieldData.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateCustomFieldData, isLoading: isUpdating } =
    trpc.customFieldDatas.updateCustomFieldData.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteCustomFieldData, isLoading: isDeleting } =
    trpc.customFieldDatas.deleteCustomFieldData.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewCustomFieldDataParams) => {
    if (editing) {
      updateCustomFieldData({ ...values, id: customFieldData.id });
    } else {
      createCustomFieldData(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="charValue"
          render={({ field }) => (<FormItem>
              <FormLabel>Char Value</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contextId"
          render={({ field }) => (<FormItem>
              <FormLabel>Context Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="decValue"
          render={({ field }) => (<FormItem>
              <FormLabel>Dec Value</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fieldId"
          render={({ field }) => (<FormItem>
              <FormLabel>Field Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instanceId"
          render={({ field }) => (<FormItem>
              <FormLabel>Instance Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="intValue"
          render={({ field }) => (<FormItem>
              <FormLabel>Int Value</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortCharValue"
          render={({ field }) => (<FormItem>
              <FormLabel>Short Char Value</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (<FormItem>
              <FormLabel>Value</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="valueFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Value Format</FormLabel>
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
            onClick={() => deleteCustomFieldData({ id: customFieldData.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default CustomFieldDataForm;
