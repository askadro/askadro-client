import React from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {FormProps} from "react-hook-form";

type Data = {
    value: string,
    label: string
}

type Props = {
    form: FormProps<any>
    name: string
    placeholder?: string
    label?: string
    description?: string
    data: Data[]
    defaultValues?:string
}

export const FormSelectInput = ({form, name, placeholder, label, description, data,defaultValues}: Props) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({field}:any) => (
                <FormItem>
                    {label ? <FormLabel>{label}</FormLabel> : null}
                    <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={defaultValues || field.value} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder || label || ""}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {label ? <SelectLabel>{label}</SelectLabel> : null}
                                    {data?.map((item: Data) => <SelectItem key={item.value}
                                                                           value={item.value}>{item.label}</SelectItem>)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    {description ? <FormDescription>
                        {description}
                    </FormDescription> : null}
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

