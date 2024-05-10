import React from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {FormProps} from "react-hook-form";
import {Textarea} from "@/components/ui/textarea";

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
}

export const FormTextArea = ({form, name, placeholder, label, description}:Props) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder={placeholder || label}
                            className="resize-none"
                            {...field}
                        />
                    </FormControl>
                    {description ? <FormDescription>
                        {description}
                    </FormDescription> : null}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

