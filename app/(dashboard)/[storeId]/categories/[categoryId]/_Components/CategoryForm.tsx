"use client";
import AlertModal from "@/components/modals/alert-modal";
import Heading from "@/components/ui/Heading";
import ApiAlert from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboards, Category } from "@prisma/client";
import axios from "axios";
import { Check, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formShema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});
type CategoryFormValue = z.infer<typeof formShema>;

const CategoryForm = ({
  initialData,
  billboards,
}: {
  initialData: Category | null;
  billboards: Billboards[];
}) => {
  const form = useForm<CategoryFormValue>({
    resolver: zodResolver(formShema),
    // defaultValues: initialData || {
    //   label: "",
    //   imageUrl: "",
    // },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
  const params = useParams();
  const origin = useOrigin();
  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit category" : "Add a new category";
  const toastMessage = initialData ? "Category update" : "Category create";
  const actiov = initialData ? "save changes" : "Create";

  const onSubmit = async (data: CategoryFormValue) => {
    try {
      setIsLoading(true);
      initialData
        ? await axios.patch(
            `/api/${params.storeId}/billboard/${params.billboardId}`,
            data
          )
        : await axios.post(`/api/${params.storeId}/billboard`, data);
      route.push(`/${params.storeId}/billboards`);
      route.refresh();
      toast.success(toastMessage);
    } catch (error) {
      setIsLoading(true);
      toast.error("Somethings went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/${params.storeId}/billboard/${params.billboardId}`
      );
      route.push(`/${params.storeId}/billboards`);
      route.refresh();
      toast.success("Billboard Delete.");
    } catch (error) {
      toast.error("Make sure you  removed all products and categories first.");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <div className="flex justify-between items-center">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isLoading}
            variant={"destructive"}
            size={"icon"}
            onClick={() => setIsOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Category name"
                      className=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>billboard</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.label}
                          {initialData?.billboardId === item.id ? (
                            <Check className="mr-2 h-4 w-4" />
                          ) : (
                            ""
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            {actiov}
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};

export default CategoryForm;
