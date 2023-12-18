'use client'
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Store } from "@prisma/client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { StoreModal } from "./modals/store-modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Button } from "./ui/button";
import { Check, ChevronsDownUp, PlusCircle, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;
interface StoreSwichterProps extends PopoverTriggerProps {
  items: Store[];
}
const StoreSwichter = ({ className, items = [] }: StoreSwichterProps) => {
  const router = useRouter();
  const storeModal = useStoreModal();
  const params = useParams();
  const pathname = usePathname();
  const formattedItem = items.map((data) => ({
    label: data.name,
    id: data.id,
  }));
  const currentStore = formattedItem.find((item) => item.id === params.storeId);
  const [open, setOpen] = useState(false);
  const onStoreSelect = (store: { label: string; id: string }) => {
    setOpen(false);
    router.push(`/${store.id}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label }
          <ChevronsDownUp className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store... " />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup>
              {formattedItem.map((data) => (
                <CommandItem
                  key={data.id}
                  onSelect={() => onStoreSelect(data)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {data.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.id === data.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator/>
          <CommandList>
          <CommandGroup>
            <CommandItem onSelect={()=>{
              setOpen(false)
              storeModal.onOpen()
            }}>
              <PlusCircle className='mr-2 h-4 w-4'/>
              Create Store
            </CommandItem>
          </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwichter;
