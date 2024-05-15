import React from 'react';
import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import Select from 'react-select'
import {cn} from "@/lib/utils";

type Props = {
    name: string
    label: string
    description?: string
    placeholder?: string
    data: any[]
    multi?: boolean
    state: string[] | string
    setState: any
}

export const FormMultiSelect = ({
                                    label,
                                    description,
                                    data,
                                    multi = true,
                                    state,
                                    setState
                                }: Props) => {
    return (
        <FormItem className="">
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Select
                    className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
                )} options={data} onChange={setState} value={state} isMulti={multi}/>
            </FormControl>
            {description ? <FormDescription>
                {description}
            </FormDescription> : null}
            <FormMessage/>
        </FormItem>

    );
};
