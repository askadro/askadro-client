import React from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {FormProps} from "react-hook-form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";

type Props = {
    form: any
    name: string
    placeholder?: string
    label?: string
    description?: string
    type?: string
    disable?: boolean
    defaultValue?: string | number | readonly string[] | undefined
    data:any[]
}

export const FormComboboxSelect = ({
                                       form,
                                       name,
                                       placeholder,
                                       label,
                                       description,
                                       type = "text",
                                       disable = false,
                                       defaultValue,
    data
                                   }: Props)  => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({field}) => (
                <FormItem className="flex flex-col justify-between">
                    {label ? <FormLabel>{label}</FormLabel> : null}
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "justify-between",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value
                                        ? data?.find(
                                            (d) => d.value === field.value
                                        )?.label.substring(0, 18)
                                        : `Select ${name}`}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder={`Search ${name}`}/>
                                <CommandEmpty>{`No ${name} found.`}</CommandEmpty>
                                <CommandList>
                                    {data?.map((d) => (
                                        <CommandItem
                                            value={d.label}
                                            key={d.value}
                                            onSelect={() => {
                                                form?.setValue(name, d.value)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    d.value === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {d.label}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {description ? <FormDescription>
                        {description}
                    </FormDescription> : null}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
