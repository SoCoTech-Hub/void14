"use client";

import { ScormAiccSession, NewScormAiccSessionParams, insertScormAiccSessionParams } from "@/lib/db/schema/scormAiccSessions";
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

const ScormAiccSessionForm = ({
  scormAiccSession,
  closeModal,
}: {
  scormAiccSession?: ScormAiccSession;
  closeModal?: () => void;
}) => {
  const { data: scormScoes } = trpc.scormScoes.getScormScoes.useQuery();
  const { data: scorms } = trpc.scorms.getScorms.useQuery();
  const editing = !!scormAiccSession?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertScormAiccSessionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertScormAiccSessionParams),
    defaultValues: scormAiccSession ?? {
      attempt: 0,
     hacpSession: "",
     lessonStatus: "",
     scormScoeId: "",
     scormId: "",
     scormMode: "",
     scormStatus: "",
     sessionTime: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.scormAiccSessions.getScormAiccSessions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Scorm Aicc Session ${action}d!`);
  };

  const { mutate: createScormAiccSession, isLoading: isCreating } =
    trpc.scormAiccSessions.createScormAiccSession.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateScormAiccSession, isLoading: isUpdating } =
    trpc.scormAiccSessions.updateScormAiccSession.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteScormAiccSession, isLoading: isDeleting } =
    trpc.scormAiccSessions.deleteScormAiccSession.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewScormAiccSessionParams) => {
    if (editing) {
      updateScormAiccSession({ ...values, id: scormAiccSession.id });
    } else {
      createScormAiccSession(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="attempt"
          render={({ field }) => (<FormItem>
              <FormLabel>Attempt</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hacpSession"
          render={({ field }) => (<FormItem>
              <FormLabel>Hacp Session</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lessonStatus"
          render={({ field }) => (<FormItem>
              <FormLabel>Lesson Status</FormLabel>
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
          name="scormId"
          render={({ field }) => (<FormItem>
              <FormLabel>Scorm Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a scorm" />
                  </SelectTrigger>
                  <SelectContent>
                    {scorms?.scorms.map((scorm) => (
                      <SelectItem key={scorm.id} value={scorm.id.toString()}>
                        {scorm.id}  {/* TODO: Replace with a field from the scorm model */}
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
          name="scormMode"
          render={({ field }) => (<FormItem>
              <FormLabel>Scorm Mode</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scormStatus"
          render={({ field }) => (<FormItem>
              <FormLabel>Scorm Status</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sessionTime"
          render={({ field }) => (<FormItem>
              <FormLabel>Session Time</FormLabel>
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
            onClick={() => deleteScormAiccSession({ id: scormAiccSession.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ScormAiccSessionForm;
