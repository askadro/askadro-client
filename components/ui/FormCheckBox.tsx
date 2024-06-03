import React from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Checkbox} from "@/components/ui/checkbox";

type Props = {
    form: any
    name: string
    label?: string
    description?: string
    disable?: boolean
    defaultChecked?: boolean
}

export const FormCheckboxInput = ({
                                      form,
                                      name,
                                      label,
                                      description,
                                      disable = false,
                                      defaultChecked,
                                  }: Props) => {
    return (
        <FormField
            control={form.control || form}
            name={name}
            render={({field}) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0  py-2">
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        {label ? <FormLabel
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</FormLabel> : null}

                        {description ? <FormDescription>{description}</FormDescription> : null}
                        <FormMessage/>
                    </div>
                </FormItem>
                )}
            />
            );
            };
