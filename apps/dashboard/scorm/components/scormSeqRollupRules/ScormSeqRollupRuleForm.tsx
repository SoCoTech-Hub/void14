"use client";

import { ScormSeqRollupRule, NewScormSeqRollupRuleParams, insertScormSeqRollupRuleParams } from "@soco/scorm-db/schema/scormSeqRollupRules";
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

const ScormSeqRollupRuleForm = ({
  scormSeqRollupRule,
  closeModal,
}: {
  scormSeqRollupRule?: ScormSeqRollupRule;
  closeModal?: () => void;
}) => {
  const { data: scormScoes } = trpc.scormScoes.getScormScoes.useQuery();
  const editing = !!scormSeqRollupRule?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertScormSeqRollupRuleParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertScormSeqRollupRuleParams),
    defaultValues: scormSeqRollupRule ?? {
      action: "",
     childActivitySet: "",
     conditionCombination: "",
     minimumCount: 0,
     minimumPercent: 0.0,
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

    await utils.scormSeqRollupRules.getScormSeqRollupRules.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Scorm Seq Rollup Rule ${action}d!`);
  };

  const { mutate: createScormSeqRollupRule, isLoading: isCreating } =
    trpc.scormSeqRollupRules.createScormSeqRollupRule.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateScormSeqRollupRule, isLoading: isUpdating } =
    trpc.scormSeqRollupRules.updateScormSeqRollupRule.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteScormSeqRollupRule, isLoading: isDeleting } =
    trpc.scormSeqRollupRules.deleteScormSeqRollupRule.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewScormSeqRollupRuleParams) => {
    if (editing) {
      updateScormSeqRollupRule({ ...values, id: scormSeqRollupRule.id });
    } else {
      createScormSeqRollupRule(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (<FormItem>
              <FormLabel>Action</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="childActivitySet"
          render={({ field }) => (<FormItem>
              <FormLabel>Child Activity Set</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="conditionCombination"
          render={({ field }) => (<FormItem>
              <FormLabel>Condition Combination</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minimumCount"
          render={({ field }) => (<FormItem>
              <FormLabel>Minimum Count</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minimumPercent"
          render={({ field }) => (<FormItem>
              <FormLabel>Minimum Percent</FormLabel>
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
            onClick={() => deleteScormSeqRollupRule({ id: scormSeqRollupRule.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ScormSeqRollupRuleForm;
