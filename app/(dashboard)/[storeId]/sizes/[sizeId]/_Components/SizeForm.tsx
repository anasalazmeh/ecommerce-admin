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
import LoadingButton from "@/components/ui/loadingButton";
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
import { Billboards, Category, Size } from "@prisma/client";
import { Value } from "@radix-ui/react-select";
import axios from "axios";
import { Check, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formShema = z.object({
  name: z.string().min(1),
  value: z.string().min(1)
});
type SizeFormValue = z.infer<typeof formShema>;

const SizeForm = ({ initialData }: { initialData: Size | null }) => {
  const form = useForm<SizeFormValue>({
    resolver: zodResolver(formShema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
  const params = useParams();
  const origin = useOrigin();
  const title = initialData ? "Edit size" : "Create size";
  const description = initialData ? "Edit size" : "Add a new size";
  const toastMessage = initialData ? "size update" : "size create";
  const action = initialData ? "save changes" : "Create";

  const onSubmit = async (data: SizeFormValue) => {
    try {
      setIsLoading(true);
      initialData
        ? await axios.patch(
            `/api/${params.storeId}/sizes/${params.sizeId}`,
            data
          )
        : await axios.post(`/api/${params.storeId}/sizes`, data);
      route.push(`/${params.storeId}/sizes`);
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
        `/api/${params.storeId}/sizes/${params.sizeId}`
      );
      route.push(`/${params.storeId}/sizes`);
      route.refresh();
      toast.success("Size Delete.");
    } catch (error) {
      toast.error("Make sure you  removed all products and sizes first.");
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
                      placeholder="Size name"
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
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Size value"
                      className=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isLoading?(<LoadingButton />):(
          <Button disabled={isLoading} className="ml-auto" type="submit">
            {action}
          </Button>)}
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default SizeForm;
