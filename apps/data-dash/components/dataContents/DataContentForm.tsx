"use client";

import { DataContent, NewDataContentParams, insertDataContentParams } from "@/lib/db/schema/dataContents";
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

const DataContentForm = ({
  dataContent,
  closeModal,
}: {
  dataContent?: DataContent;
  closeModal?: () => void;
}) => {
  const { data: fields } = trpc.fields.getFields.useQuery();
  const { data: dataRecords } = trpc.dataRecords.getDataRecords.useQuery();
  const editing = !!dataContent?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertDataContentParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertDataContentParams),
    defaultValues: dataContent ?? {
      content: "",
     content1: "",
     content2: "",
     content3: "",
     content4: "",
     fieldId: "",
     dataRecordId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.dataContents.getDataContents.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Data Content ${action}d!`);
  };

  const { mutate: createDataContent, isLoading: isCreating } =
    trpc.dataContents.createDataContent.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateDataContent, isLoading: isUpdating } =
    trpc.dataContents.updateDataContent.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteDataContent, isLoading: isDeleting } =
    trpc.dataContents.deleteDataContent.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewDataContentParams) => {
    if (editing) {
      updateDataContent({ ...values, id: dataContent.id });
    } else {
      createDataContent(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (<FormItem>
              <FormLabel>Content</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content1"
          render={({ field }) => (<FormItem>
              <FormLabel>Content1</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content2"
          render={({ field }) => (<FormItem>
              <FormLabel>Content2</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content3"
          render={({ field }) => (<FormItem>
              <FormLabel>Content3</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content4"
          render={({ field }) => (<FormItem>
              <FormLabel>Content4</FormLabel>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a field" />
                  </SelectTrigger>
                  <SelectContent>
                    {fields?.fields.map((field) => (
                      <SelectItem key={field.field.id} value={field.field.id.toString()}>
                        {field.field.id}  {/* TODO: Replace with a field from the field model */}
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
          name="dataRecordId"
          render={({ field }) => (<FormItem>
              <FormLabel>Data Record Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a data record" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataRecords?.dataRecords.map((dataRecord) => (
                      <SelectItem key={dataRecord.dataRecord.id} value={dataRecord.dataRecord.id.toString()}>
                        {dataRecord.dataRecord.id}  {/* TODO: Replace with a field from the dataRecord model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            onClick={() => deleteDataContent({ id: dataContent.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default DataContentForm;
