import React from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {FormProps} from "react-hook-form";
import {cn} from "@/lib/utils";

type Props = {
    form: any
    name: string
    placeholder?: string
    label?: string
    description?: string
    type?: string
    disable?: boolean
    defaultValue?: string | number | readonly string[] | undefined
    uppercase?: boolean
}

export const FormTextInput = ({
                                  form,
                                  name,
                                  placeholder,
                                  label,
                                  description,
                                  type = "text",
                                  disable = false,
                                  defaultValue,
                                  uppercase,
                              }: Props) => {
    return (
        <FormField
            control={form.control || form}
            name={name}
            render={({field}) => (
                <FormItem className="mb-2">
                    {label ? <FormLabel>{label}</FormLabel> : null}
                    <FormControl>
                        <Input autoComplete="new-password" className={uppercase ? "uppercase" : ""} defaultValue={defaultValue} disabled={disable}
                               type={type}
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
