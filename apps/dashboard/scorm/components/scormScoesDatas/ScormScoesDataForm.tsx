"use client";

import { ScormScoesData, NewScormScoesDataParams, insertScormScoesDataParams } from "@soco/scorm-db/schema/scormScoesDatas";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@soco/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ScormScoesDataForm = ({
  scormScoesData,
  closeModal,
}: {
  scormScoesData?: ScormScoesData;
  closeModal?: () => void;
}) => {
  const { data: scormScoes } = trpc.scormScoes.getScormScoes.useQuery();
  const editing = !!scormScoesData?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertScormScoesDataParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertScormScoesDataParams),
    defaultValues: scormScoesData ?? {
      name: "",
     scormScoeId: "",
     value: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.scormScoesDatas.getScormScoesDatas.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Scorm Scoes Data ${action}d!`);
  };

  const { mutate: createScormScoesData, isLoading: isCreating } =
    trpc.scormScoesDatas.createScormScoesData.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateScormScoesData, isLoading: isUpdating } =
    trpc.scormScoesDatas.updateScormScoesData.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteScormScoesData, isLoading: isDeleting } =
    trpc.scormScoesDatas.deleteScormScoesData.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewScormScoesDataParams) => {
    if (editing) {
      updateScormScoesData({ ...values, id: scormScoesData.id });
    } else {
      createScormScoesData(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
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
          name="scormScoeId"
          render={({ field }) => (<FormItem>
              <FormLabel>Scorm Scoe Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a scorm scoe" />
                  </SelectTrigger>
                  <SelectContent>
                    {scormScoes?.scormScoes.map((scormScoe) => (
                      <SelectItem key={scormScoe.scormScoe.id} value={scormScoe.scormScoe.id.toString()}>
                        {scormScoe.scormScoe.id}  {/* TODO: Replace with a field from the scormScoe model */}
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
            onClick={() => deleteScormScoesData({ id: scormScoesData.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ScormScoesDataForm;
