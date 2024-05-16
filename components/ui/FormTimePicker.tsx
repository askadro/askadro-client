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
            <Label className="self-center mt-6">{label}</Label>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormControl>
                            <TimePicker date={field.value} setDate={field.onChange}/>
                            {/*<div className="flex items-end gap-2">*/}
                            {/*    <div className="grid gap-1 text-center">*/}
                            {/*        <Label htmlFor="hours" className="text-xs">*/}
                            {/*            Hours*/}
                            {/*        </Label>*/}
                            {/*        <TimePickerInput*/}
                            {/*            picker="hours"*/}
                            {/*            date={date}*/}
                            {/*            setDate={setDate}*/}
                            {/*            ref={hourRef}*/}
                            {/*            onRightFocus={() => minuteRef.current?.focus()}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*    <div className="grid gap-1 text-center">*/}
                            {/*        <Label htmlFor="minutes" className="text-xs">*/}
                            {/*            Minutes*/}
                            {/*        </Label>*/}
                            {/*        <TimePickerInput*/}
                            {/*            picker="minutes"*/}
                            {/*            date={date}*/}
                            {/*            setDate={setDate}*/}
                            {/*            ref={minuteRef}*/}
                            {/*            onLeftFocus={() => hourRef.current?.focus()}*/}
                            {/*            onRightFocus={() => secondRef.current?.focus()}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*    {second ? <div className="grid gap-1 text-center">*/}
                            {/*        <Label htmlFor="seconds" className="text-xs">*/}
                            {/*            Seconds*/}
                            {/*        </Label>*/}
                            {/*        <TimePickerInput*/}
                            {/*            picker="seconds"*/}
                            {/*            date={date}*/}
                            {/*            setDate={setDate}*/}
                            {/*            ref={secondRef}*/}
                            {/*            onLeftFocus={() => minuteRef.current?.focus()}*/}
                            {/*        />*/}
                            {/*    </div> : null}*/}
                            {/*    <div className="flex h-10 items-center">*/}
                            {/*        <Clock className="ml-2 h-4 w-4"/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
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