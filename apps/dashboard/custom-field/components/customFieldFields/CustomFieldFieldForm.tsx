"use client";

import { CustomFieldField, NewCustomFieldFieldParams, insertCustomFieldFieldParams } from "@soco/custom-field-db/schema/customFieldFields";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CustomFieldFieldForm = ({
  customFieldField,
  closeModal,
}: {
  customFieldField?: CustomFieldField;
  closeModal?: () => void;
}) => {
  const { data: customFieldCategories } = trpc.customFieldCategories.getCustomFieldCategories.useQuery();
  const editing = !!customFieldField?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertCustomFieldFieldParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertCustomFieldFieldParams),
    defaultValues: customFieldField ?? {
      customFieldCategoryId: "",
     configData: "",
     description: "",
     descriptionFormat: 0,
     name: "",
     shortName: "",
     sortOrder: 0,
     type: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.customFieldFields.getCustomFieldFields.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Custom Field Field ${action}d!`);
  };

  const { mutate: createCustomFieldField, isLoading: isCreating } =
    trpc.customFieldFields.createCustomFieldField.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateCustomFieldField, isLoading: isUpdating } =
    trpc.customFieldFields.updateCustomFieldField.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteCustomFieldField, isLoading: isDeleting } =
    trpc.customFieldFields.deleteCustomFieldField.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewCustomFieldFieldParams) => {
    if (editing) {
      updateCustomFieldField({ ...values, id: customFieldField.id });
    } else {
      createCustomFieldField(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="customFieldCategoryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Custom Field Category Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a custom field category" />
                  </SelectTrigger>
                  <SelectContent>
                    {customFieldCategories?.customFieldCategories.map((customFieldCategory) => (
                      <SelectItem key={customFieldCategory.id} value={customFieldCategory.id.toString()}>
                        {customFieldCategory.id}  {/* TODO: Replace with a field from the customFieldCategory model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="configData"
          render={({ field }) => (<FormItem>
              <FormLabel>Config Data</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (<FormItem>
              <FormLabel>Description</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descriptionFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Description Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (<FormItem>
              <FormLabel>Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortName"
          render={({ field }) => (<FormItem>
              <FormLabel>Short Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sortOrder"
          render={({ field }) => (<FormItem>
              <FormLabel>Sort Order</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (<FormItem>
              <FormLabel>Type</FormLabel>
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
            onClick={() => deleteCustomFieldField({ id: customFieldField.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default CustomFieldFieldForm;
