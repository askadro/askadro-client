import React from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {FormProps} from "react-hook-form";
import Select from 'react-select'

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
            <FormControl className="w-[360px]">
                <Select options={data} onChange={setState} value={state} isMulti={multi}/>
            </FormControl>
            {description ? <FormDescription>
                {description}
            </FormDescription> : null}
            <FormMessage/>
        </FormItem>

    );
};
