"use client";

import { Data, NewDataParams, insertDataParams } from "@soco/data-db/schema/datas";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DataForm = ({
  data,
  closeModal,
}: {
  data?: Data;
  closeModal?: () => void;
}) => {
  
  const editing = !!data?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertDataParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertDataParams),
    defaultValues: data ?? {
      addTemplate: "",
     approval: false,
     assessed: 0,
     assessTimeFinish: 0,
     assessTimeStart: 0,
     comments: false,
     completionEntries: 0,
     config: "",
     course: 0,
     cssTemplate: "",
     defaultSort: 0,
     defaultSortDir: false,
     editAny: false,
     intro: "",
     introFormat: false,
     jsTemplate: "",
     listTemplate: "",
     listTemplateFooter: "",
     listTemplateHeader: "",
     manageApproved: false,
     maxEntries: 0,
     name: "",
     notification: 0,
     requiredEntries: 0,
     requiredEntriesToView: 0,
     rssArticles: 0,
     rssTemplate: "",
     rssTitleTemplate: "",
     scale: 0,
     searchTemplate: "",
     singleTemplate: "",
     timeAvailableFrom: 0,
     timeAvailableTo: 0,
     timeViewFrom: 0,
     timeViewTo: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.datas.getDatas.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Data ${action}d!`);
  };

  const { mutate: createData, isLoading: isCreating } =
    trpc.datas.createData.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateData, isLoading: isUpdating } =
    trpc.datas.updateData.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteData, isLoading: isDeleting } =
    trpc.datas.deleteData.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewDataParams) => {
    if (editing) {
      updateData({ ...values, id: data.id });
    } else {
      createData(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="addTemplate"
          render={({ field }) => (<FormItem>
              <FormLabel>Add Template</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="approval"
          render={({ field }) => (<FormItem>
              <FormLabel>Approval</FormLabel>
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
          name="assessed"
          render={({ field }) => (<FormItem>
              <FormLabel>Assessed</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assessTimeFinish"
          render={({ field }) => (<FormItem>
              <FormLabel>Assess Time Finish</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assessTimeStart"
          render={({ field }) => (<FormItem>
              <FormLabel>Assess Time Start</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (<FormItem>
              <FormLabel>Comments</FormLabel>
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
          name="completionEntries"
          render={({ field }) => (<FormItem>
              <FormLabel>Completion Entries</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="config"
          render={({ field }) => (<FormItem>
              <FormLabel>Config</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (<FormItem>
              <FormLabel>Course</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cssTemplate"
          render={({ field }) => (<FormItem>
              <FormLabel>Css Template</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="defaultSort"
          render={({ field }) => (<FormItem>
              <FormLabel>Default Sort</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="defaultSortDir"
          render={({ field }) => (<FormItem>
              <FormLabel>Default Sort Dir</FormLabel>
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
          name="editAny"
          render={({ field }) => (<FormItem>
              <FormLabel>Edit Any</FormLabel>
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
          name="intro"
          render={({ field }) => (<FormItem>
              <FormLabel>Intro</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="introFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Intro Format</FormLabel>
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
          name="jsTemplate"
          render={({ field }) => (<FormItem>
              <FormLabel>Js Template</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="listTemplate"
          render={({ field }) => (<FormItem>
              <FormLabel>List Template</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="listTemplateFooter"
          render={({ field }) => (<FormItem>
              <FormLabel>List Template Footer</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="listTemplateHeader"
          render={({ field }) => (<FormItem>
              <FormLabel>List Template Header</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="manageApproved"
          render={({ field }) => (<FormItem>
              <FormLabel>Manage Approved</FormLabel>
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
          name="maxEntries"
          render={({ field }) => (<FormItem>
              <FormLabel>Max Entries</FormLabel>
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
          name="notification"
          render={({ field }) => (<FormItem>
              <FormLabel>Notification</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requiredEntries"
          render={({ field }) => (<FormItem>
              <FormLabel>Required Entries</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requiredEntriesToView"
          render={({ field }) => (<FormItem>
              <FormLabel>Required Entries To View</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rssArticles"
          render={({ field }) => (<FormItem>
              <FormLabel>Rss Articles</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rssTemplate"
          render={({ field }) => (<FormItem>
              <FormLabel>Rss Template</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rssTitleTemplate"
          render={({ field }) => (<FormItem>
              <FormLabel>Rss Title Template</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scale"
          render={({ field }) => (<FormItem>
              <FormLabel>Scale</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="searchTemplate"
          render={({ field }) => (<FormItem>
              <FormLabel>Search Template</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="singleTemplate"
          render={({ field }) => (<FormItem>
              <FormLabel>Single Template</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeAvailableFrom"
          render={({ field }) => (<FormItem>
              <FormLabel>Time Available From</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeAvailableTo"
          render={({ field }) => (<FormItem>
              <FormLabel>Time Available To</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeViewFrom"
          render={({ field }) => (<FormItem>
              <FormLabel>Time View From</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeViewTo"
          render={({ field }) => (<FormItem>
              <FormLabel>Time View To</FormLabel>
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
            onClick={() => deleteData({ id: data.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default DataForm;
