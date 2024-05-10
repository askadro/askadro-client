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
    label: string
    description?: string
    data: Data[]
}

export const FormSelectInput = ({form, name, placeholder, label, description, data}: Props) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={placeholder || label}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>{label}</SelectLabel>
                                    {data.map((item: Data) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
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

