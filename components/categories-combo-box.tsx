"use client";
import { fetcher } from "@/lib/fetcher";
import React, { useState } from "react";
import useSWR from "swr";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = { id: number; name: string };

interface CategoriesComboBoxProps {
  field: any;
}

const CategoriesComboBox = ({ field }: CategoriesComboBoxProps) => {
  const { data, error, isLoading } = useSWR<{ trivia_categories: Category[] }>(
    "https://opentdb.com/api_category.php",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 60 * 24,
    },
  );

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  if (error) {
    return <div>Error loading categories. Please try again later.</div>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={isLoading}
          className="w-full rounded-full border border-black bg-[#dee2e6] px-4"
        >
          {isLoading
            ? "Loading..."
            : value
              ? data?.trivia_categories?.find(
                  (category) => category.name === value,
                )?.name
              : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="">
        <Command className="w-full">
          <CommandInput placeholder="Search category..." />
          <CommandList className="[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2">
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {!!value && (
                <CommandItem
                  key={"none"}
                  className="hover:bg-red-50"
                  value=""
                  onSelect={() => {
                    setValue("");
                    field.onChange(undefined);
                    setOpen(false);
                  }}
                >
                  <X className={cn("mr-2 h-4 w-4")} />
                  No Category
                </CommandItem>
              )}
              {data?.trivia_categories?.map((category: Category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue);
                    field.onChange(category.id); //update travia-form category value
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoriesComboBox;
