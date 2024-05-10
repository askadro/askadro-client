import React from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {FormProps} from "react-hook-form";
import Select from 'react-select'

type Props = {
    form: FormProps<any>
    name: string
    label: string
    description?: string
    placeholder?: string
    data: any[]
    multi?: boolean
    roles: string[]
    setRoles: any
}

export const FormMultiSelect = ({
                                    label,
                                    description,
                                    data,
                                    multi = true,
                                    roles,
                                    setRoles
                                }: Props) => {
    return (

        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl className="w-[360px]">
                <Select options={data} onChange={setRoles} value={roles} isMulti={multi}/>
            </FormControl>
            {description ? <FormDescription>
                {description}
            </FormDescription> : null}
            <FormMessage/>
        </FormItem>

    );
};
