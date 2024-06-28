import {Check, ChevronsUpDown} from "lucide-react";
import React from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useTranslations} from "next-intl";

export const SelectInputWithSearch = ({data,label,onSelect,value}:any)=>{
    const t = useTranslations("index")
    return(
        <Popover>
            <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className="w-[200px] justify-between"
                    >
                        {value
                            ? data?.find(
                                (i: { value: any; }) => i.value === value
                            )?.label
                            : `${t("search_data",{state:label})}`}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder={`${t("search_data", {state: label})}`}/>
                    <CommandEmpty>{`${t("not_found_with",{state:label})}`}</CommandEmpty>
                    <CommandList>
                        {data?.map((d:any) => (
                            <CommandItem
                                value={d.value}
                                key={d.value}
                                onSelect={onSelect}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === data.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {d.label}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}