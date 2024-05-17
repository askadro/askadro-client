"use client";

import * as React from "react";
import {Label} from "@/components/ui/label";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {TimePicker} from "@/components/ui/time-picker";

interface TimePickerDemoProps {
    name: string
    label:string
    form:any
    description?:string
}

export function FormTimePicker({name,label,form,description}: TimePickerDemoProps) {
    return (
        <div className="flex gap-4">
            <Label className="self-center mt-6 w-[100px]">{label}</Label>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormControl>
                            <TimePicker date={field.value} setDate={field.onChange}/>
                        </FormControl>
                        {description ? <FormDescription>
                            {description}
                        </FormDescription> : null}
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    );
}