import React from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {FormProps} from "@/types/FormPropsType";
import {useTranslations} from "next-intl";

export const FormSelectWithSearch = (props: FormProps) => {
    const t = useTranslations("index")
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
                                        : `${t("search_data",{state:label})}`}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput placeholder={`${t("search_data", {state: label})}`}/>
                                <CommandEmpty>{`${t("not_found_with",{state:label})}`}</CommandEmpty>
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

