"use client";

import { DataRecord, NewDataRecordParams, insertDataRecordParams } from "@soco/data-db/schema/dataRecords";
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
import { Checkbox } from "@soco/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@soco/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DataRecordForm = ({
  dataRecord,
  closeModal,
}: {
  dataRecord?: DataRecord;
  closeModal?: () => void;
}) => {
  const { data: datas } = trpc.datas.getDatas.useQuery();
  const editing = !!dataRecord?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertDataRecordParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertDataRecordParams),
    defaultValues: dataRecord ?? {
      approved: false,
     dataId: "",
     groupId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.dataRecords.getDataRecords.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Data Record ${action}d!`);
  };

  const { mutate: createDataRecord, isLoading: isCreating } =
    trpc.dataRecords.createDataRecord.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateDataRecord, isLoading: isUpdating } =
    trpc.dataRecords.updateDataRecord.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteDataRecord, isLoading: isDeleting } =
    trpc.dataRecords.deleteDataRecord.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewDataRecordParams) => {
    if (editing) {
      updateDataRecord({ ...values, id: dataRecord.id });
    } else {
      createDataRecord(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="approved"
          render={({ field }) => (<FormItem>
              <FormLabel>Approved</FormLabel>
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
          name="dataId"
          render={({ field }) => (<FormItem>
              <FormLabel>Data Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a data" />
                  </SelectTrigger>
                  <SelectContent>
                    {datas?.datas.map((data) => (
                      <SelectItem key={data.id} value={data.id.toString()}>
                        {data.id}  {/* TODO: Replace with a field from the data model */}
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
          name="groupId"
          render={({ field }) => (<FormItem>
              <FormLabel>Group Id</FormLabel>
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
            onClick={() => deleteDataRecord({ id: dataRecord.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default DataRecordForm;
