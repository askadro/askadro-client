import React from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {FormProps} from "react-hook-form";

type Props = {
    form: FormProps<any>
    name: string
    placeholder?: string
    label?: string
    description?: string
    type?: string
    disable?: boolean
    defaultValue?: string | number | readonly string[] | undefined
}

export const FormTextInput = ({
                                  form,
                                  name,
                                  placeholder,
                                  label,
                                  description,
                                  type = "text",
                                  disable = false,
                                  defaultValue
                              }: Props) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({field}) => (
                <FormItem>
                    {label ? <FormLabel>{label}</FormLabel> : null}
                    <FormControl>
                        <Input defaultValue={defaultValue} disabled={disable} type={type}
                               placeholder={placeholder || label} {...field}/>
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
