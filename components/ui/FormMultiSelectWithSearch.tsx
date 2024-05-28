"use client"

import {CheckIcon, ChevronDown, X} from "lucide-react"
import React, {useEffect, useState} from "react"
import {cn} from "@/lib/utils"
import {Badge} from "@/components/ui/badge"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem, CommandList,
} from "@/components/ui/command"
import {
    FormControl, FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {FormProps} from "@/types/FormPropsType";
import {useTranslations} from "next-intl";

export const FormMultiSelectWithSearch = (props: FormProps) => {
    const {label, name, form, data, description,defaultValue} = props
    const [selected, setSelected] = useState(() => new Set<string>())
    const t = useTranslations("index")

    useEffect(() => {
        if (defaultValue) {
            setSelected(new Set(defaultValue));
        }
    }, [defaultValue]);

    return (
        <FormField
            control={form.control}
            name={name}
            render={() => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <div
                                    className="relative flex min-h-[36px] items-center justify-end rounded-md border data-[state=open]:border-ring">
                                    <div
                                        className="relative mr-auto flex flex-grow flex-wrap items-center overflow-hidden px-3 py-1">
                                        {selected?.size > 0 ? (
                                            data &&
                                            data
                                                .filter((option) =>
                                                    selected.has(option.value),
                                                )
                                                .map((option) => (
                                                    <Badge
                                                        key={option.value}
                                                        variant="outline"
                                                        className="m-[2px] gap-1 pr-0.5"
                                                    >
                                                        <span className="">{option.label}</span>
                                                        <span
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                setSelected((prev) => {
                                                                    const next = new Set(prev)
                                                                    next.delete(option.value)
                                                                    return next
                                                                })
                                                            }}
                                                            className="flex items-center rounded-sm px-[1px] hover:bg-accent hover:text-red-500"
                                                        >
                                      <X size={14}/>
                                    </span>
                                                    </Badge>
                                                ))
                                        ) : (
                                            <span className="mr-auto text-sm">Select...</span>
                                        )}
                                    </div>
                                    <div
                                        className="flex flex-shrink-0 items-center self-stretch px-1 text-muted-foreground/60">
                                        {selected?.size > 0 && (
                                            <div
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setSelected(new Set())
                                                }}
                                                className="flex items-center self-stretch p-2 hover:text-red-500"
                                            >
                                                <X size={16}/>
                                            </div>
                                        )}
                                        <span className="mx-0.5 my-2 w-[1px] self-stretch bg-border"/>
                                        <div className="flex items-center self-stretch p-2 hover:text-muted-foreground">
                                            <ChevronDown size={16}/>
                                        </div>
                                    </div>
                                </div>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-[var(--radix-popover-trigger-width)] p-0"
                            align="start"
                        >
                            <Command>
                                <CommandInput
                                    placeholder={`${t("search_data",{state:label})}`}
                                    className="h-9"
                                />
                                <CommandEmpty>No result found.</CommandEmpty>
                                <CommandList>
                                    {data?.map((d, index) => {
                                        const isSelected = selected.has(d.value)
                                        return (
                                            <CommandItem
                                                key={index}
                                                onSelect={() => {
                                                    if (isSelected) {
                                                        selected.delete(d.value)
                                                    } else {
                                                        selected.add(d.value)
                                                    }
                                                    const filterValues = Array.from(selected)
                                                    form.setValue(name, filterValues)
                                                }}
                                            >
                                                <div
                                                    className={cn(
                                                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                        isSelected
                                                            ? "bg-primary text-primary-foreground"
                                                            : "opacity-50 [&_svg]:invisible",
                                                    )}
                                                >
                                                    <CheckIcon className={cn("h-4 w-4")}/>
                                                </div>
                                                <span>{d.label}</span>
                                            </CommandItem>
                                        )
                                    })}
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
    )
}