import React from 'react';
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


export const SelectModal = (props: any) => {
    const {
        label,
        desc,
        selectLabel,
        selectedValue,
        setSelectedValue,
        list,
        buttonTitle,
        cancelButtonTitle,
        name,
        onSubmit,
    } = props
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">{label}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{label}</DialogTitle>
                    <DialogDescription>
                        {desc}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            {selectLabel}
                        </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                >
                                    {selectedValue
                                        ? list?.find((l: { value: string; }) => l.value === selectedValue)?.label
                                        : `Select ${name}...`}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder={`Search ${name}...`}/>
                                    <CommandEmpty>{`No ${name} found.`}</CommandEmpty>
                                    <CommandList>
                                        {list?.map((l: any) => (
                                            <CommandItem
                                                key={l.value}
                                                value={l.value}
                                                onSelect={(currentValue) => {
                                                    setSelectedValue(currentValue === selectedValue ? "" : currentValue)
                                                    setOpen(false)
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
                {selectedValue ? <DialogFooter>
                    <Button onClick={onSubmit} type="submit">{buttonTitle}</Button>
                </DialogFooter> : null}
            </DialogContent>
        </Dialog>
    );
};

