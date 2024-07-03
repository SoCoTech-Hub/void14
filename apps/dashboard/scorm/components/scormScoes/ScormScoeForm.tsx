"use client";

import { ScormScoe, NewScormScoeParams, insertScormScoeParams } from "@/lib/db/schema/scormScoes";
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

const ScormScoeForm = ({
  scormScoe,
  closeModal,
}: {
  scormScoe?: ScormScoe;
  closeModal?: () => void;
}) => {
  const { data: scorms } = trpc.scorms.getScorms.useQuery();
  const editing = !!scormScoe?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertScormScoeParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertScormScoeParams),
    defaultValues: scormScoe ?? {
      identifier: "",
     launch: "",
     manifest: "",
     organization: "",
     parent: "",
     scormId: "",
     scormType: "",
     sortOrder: 0,
     title: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.scormScoes.getScormScoes.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Scorm Scoe ${action}d!`);
  };

  const { mutate: createScormScoe, isLoading: isCreating } =
    trpc.scormScoes.createScormScoe.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateScormScoe, isLoading: isUpdating } =
    trpc.scormScoes.updateScormScoe.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteScormScoe, isLoading: isDeleting } =
    trpc.scormScoes.deleteScormScoe.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewScormScoeParams) => {
    if (editing) {
      updateScormScoe({ ...values, id: scormScoe.id });
    } else {
      createScormScoe(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (<FormItem>
              <FormLabel>Identifier</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="launch"
          render={({ field }) => (<FormItem>
              <FormLabel>Launch</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="manifest"
          render={({ field }) => (<FormItem>
              <FormLabel>Manifest</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (<FormItem>
              <FormLabel>Organization</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parent"
          render={({ field }) => (<FormItem>
              <FormLabel>Parent</FormLabel>
                <FormControl>
            <Input {...field} />
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
          name="scormType"
          render={({ field }) => (<FormItem>
              <FormLabel>Scorm Type</FormLabel>
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
          name="title"
          render={({ field }) => (<FormItem>
              <FormLabel>Title</FormLabel>
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
            onClick={() => deleteScormScoe({ id: scormScoe.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ScormScoeForm;
