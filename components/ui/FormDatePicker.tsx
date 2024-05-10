import React, {forwardRef} from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import DatePicker from "react-date-picker";
import {FormProps} from "react-hook-form";

type Props = {
    form: FormProps<any>
    name: string
    label: string
    description?: string
}

// eslint-disable-next-line react/display-name
export const FormDatePicker = forwardRef(({form, name, label, description}: Props,ref) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({field}) => (
                <FormItem className="flex flex-col">
                    <FormLabel>{label}</FormLabel>
                    <FormControl defaultValue={field.value} className="w-[180px]">
                        <DatePicker locale="tr-TR" format={"dd/MM/yyyy"} {...field} />
                    </FormControl>
                    {description ? <FormDescription>{description}</FormDescription> : null}
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
});

