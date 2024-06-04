import React from 'react';
import {useForm, useFieldArray} from 'react-hook-form';
import {Popover, PopoverContent, PopoverTrigger} from "../popover";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandInput, CommandItem, CommandList} from "../command";
import {Button} from "../button";
import {Label} from "../label";
import {cn} from "../../../lib/utils";
import {
    DialogTrigger, Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../dialog";
import {TITLES} from "../../../config/enums";
import {FormTextInput} from "../FormTextInput";
import {FormSelectInput} from "../FormSelectInput";
import {useTranslations} from "next-intl";
import {z} from "zod";

const jobFormSchema = z.object({
    jobs: z.array(z.object({
        userId: z.string(),
        name: z.string(),
        extraPrice: z.string(),
        extraTime: z.string(),
        title: z.string(),
    }))
})

export const SelectModalTable = (props: any) => {
    const {
        label,
        desc,
        selectLabel,
        list,
        buttonTitle,
        name,
        onSubmit,
        extraData
    } = props;
    const t = useTranslations("index")
    const form = useForm<z.infer<typeof jobFormSchema>>({
        defaultValues: {
            jobs: [],
        },
    });

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: 'jobs' as never,
    });

    const [selectedValue, setSelectedValue] = React.useState("")
    const [open, setOpen] = React.useState(false);

    const handleSelect = (item: any) => {
        const newItem = {
            userId: item.value,
            name: `${item.label}`,
            extraPrice: '0',
            extraTime: '0',
            title: TITLES[0].label,
            ticketId: extraData.id,
            enterTime: extraData.enterTime,
            exitTime: extraData.exitTime
        };
        append(newItem);
        setSelectedValue(item.value);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">{label}</Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>{label}</DialogTitle>
                    <DialogDescription>{desc}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-4 jobs-center gap-4 items-center">
                        <Label htmlFor="name" className="text-right">
                            {selectLabel}
                        </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full sm:w-[200px] justify-between"
                                >
                                    {selectedValue
                                        ? list?.find((l: { value: string; }) => {
                                            return l.value === selectedValue
                                        })?.label
                                        : `${t("search", {name})}`}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full sm:w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder={`${t("search", {name})}`}/>
                                    <CommandEmpty>{t("not_found_state", {name})}</CommandEmpty>
                                    <CommandList>
                                        {list?.map((l: any) => (
                                            <CommandItem
                                                key={l.value}
                                                value={l.label}
                                                onSelect={() => {
                                                    handleSelect(l);
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        selectedValue === l.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {l.label}
                                            </CommandItem>
                                        ))}
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="overflow-x-auto">
                        {fields.length > 0 ? (
                            <table className="min-w-full divide-y">
                                <thead>
                                <tr>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Extra Price</th>
                                    <th className="px-4 py-2">Extra Time</th>
                                    <th className="px-4 py-2">Title</th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {fields.map((item, index) => (
                                    <tr key={item.id} className="">
                                        <td className="px-4 py-2">
                                            <Label
                                                className="line-clamp-1">{form.getValues(`jobs.${index}.name`)}</Label>
                                        </td>
                                        <td className="px-4 py-2">
                                            <FormTextInput form={form} name={`jobs.${index}.extraPrice`}/>
                                        </td>
                                        <td className="px-4 py-2">
                                            <FormTextInput form={form} name={`jobs.${index}.extraTime`}/>
                                        </td>
                                        <td className="px-4 py-2">
                                            <FormSelectInput form={form} name={`jobs.${index}.title`}
                                                             data={TITLES || []}/>
                                        </td>
                                        <td className="px-4 py-2">
                                            <Button type="button" size="sm" className="bg-red-400"
                                                    onClick={() => remove(index)}>-</Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : null}
                    </div>
                    {fields.length > 0 ? (
                        <DialogFooter>
                            <Button onClick={form.handleSubmit(onSubmit)}>{buttonTitle}</Button>
                        </DialogFooter>
                    ) : null}
                </form>
            </DialogContent>
        </Dialog>
    );
};
