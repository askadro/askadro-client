import React from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {FormProps} from "react-hook-form";

type Props = {
    form: FormProps<any>
    name: string
    placeholder?: string
    label: string
    description?: string
}

export const FormSelectImage = ({form, name, label, description}: Props) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl className="w-[360px]">
                        <Input id="picture" type="file" {...field} />
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
