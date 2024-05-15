import React from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {FormProps} from "@/types/FormPropsType";

export const FormSelectWithSearch = (props: FormProps) => {
    const {form, data,description,label,name} = props
    return (
        <FormField
            control={form.control}
            name={name}
            render={({field}) => (
                <FormItem className="flex flex-col mb-2">
                    <FormLabel>{label}</FormLabel>
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
                                            (language) => language.value === field.value
                                        )?.label
                                        : `Select ${name}`}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput placeholder={`Search ${name}`}/>
                                <CommandEmpty>{`No ${name} found.`}</CommandEmpty>
                                <CommandList>
                                    {data?.map((d) => (
                                        <CommandItem
                                            value={d.label}
                                            key={d.value}
                                            onSelect={() => {
                                                form.setValue(name, d.value)
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
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

