import React, {forwardRef} from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import DatePicker from "react-date-picker";
import {FormProps} from "react-hook-form";
import {cn} from "@/lib/utils";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";

type Props = {
    form: FormProps<any>
    name: string
    label: string
    description?: string
}

// eslint-disable-next-line react/display-name
export const FormDatePicker = forwardRef(({form, name, label, description}: Props, ref) => {
    return (
        <div className="mt-4">
            <FormField
                control={form.control}
                name={name}
                render={({field}) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>{label}</FormLabel>
                        <FormControl defaultValue={field.value} className="w-[180px]">
                            {/*<DatePicker className={cn("flex h-9 w-9 items-center justify-center bg-accent-foreground")}*/}
                            {/*            locale="tr-TR" format={"dd/MM/yyyy"} {...field} />*/}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-[240px] justify-start text-left font-normal", !field.value  && "text-muted-foreground")}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? format(field.value , "dd-MM-yyyy") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="start" className=" w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        captionLayout="dropdown-buttons"
                                        selected={field.value}
                                        onSelect={(v)=>field.onChange(v?.toString())}
                                        fromYear={1960}
                                        toYear={new Date().getFullYear()}
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                        {description ? <FormDescription>{description}</FormDescription> : null}
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    );
});

