"use client";

import { ScormSeqObjective, NewScormSeqObjectiveParams, insertScormSeqObjectiveParams } from "@/lib/db/schema/scormSeqObjectives";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ScormSeqObjectiveForm = ({
  scormSeqObjective,
  closeModal,
}: {
  scormSeqObjective?: ScormSeqObjective;
  closeModal?: () => void;
}) => {
  const { data: scormScoes } = trpc.scormScoes.getScormScoes.useQuery();
  const editing = !!scormSeqObjective?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertScormSeqObjectiveParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertScormSeqObjectiveParams),
    defaultValues: scormSeqObjective ?? {
      minNormalizedMeasure: 0.0,
     objectiveId: "",
     primaryObj: false,
     satisfiedByMeasure: false,
     scormScoeId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.scormSeqObjectives.getScormSeqObjectives.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Scorm Seq Objective ${action}d!`);
  };

  const { mutate: createScormSeqObjective, isLoading: isCreating } =
    trpc.scormSeqObjectives.createScormSeqObjective.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateScormSeqObjective, isLoading: isUpdating } =
    trpc.scormSeqObjectives.updateScormSeqObjective.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteScormSeqObjective, isLoading: isDeleting } =
    trpc.scormSeqObjectives.deleteScormSeqObjective.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewScormSeqObjectiveParams) => {
    if (editing) {
      updateScormSeqObjective({ ...values, id: scormSeqObjective.id });
    } else {
      createScormSeqObjective(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="minNormalizedMeasure"
          render={({ field }) => (<FormItem>
              <FormLabel>Min Normalized Measure</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="objectiveId"
          render={({ field }) => (<FormItem>
              <FormLabel>Objective Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="primaryObj"
          render={({ field }) => (<FormItem>
              <FormLabel>Primary Obj</FormLabel>
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
          name="satisfiedByMeasure"
          render={({ field }) => (<FormItem>
              <FormLabel>Satisfied By Measure</FormLabel>
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
            onClick={() => deleteScormSeqObjective({ id: scormSeqObjective.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ScormSeqObjectiveForm;
