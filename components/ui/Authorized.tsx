"use client"

import React from 'react';
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";
import {useFormContext, useFieldArray} from "react-hook-form";
import {FormTextInput} from "@/components/ui/FormTextInput";

export const Authorized = () => {
    const {control} = useFormContext();
    const t = useTranslations()
    const {fields, append, remove} = useFieldArray({
        control,
        name: "authorized"
    });

    return (
        <Card className="sm:col-span-2">
            <CardHeader>
                <CardTitle>{`${t("authorized")} (${t("opsiyonel")})`}</CardTitle>
                <CardDescription>
                    {t("authorized_decs")}
                </CardDescription>
            </CardHeader>
            {fields.map((item, index) => (
                <div key={item.id} className="flex gap-2 mb-2 sm:col-span-4">
                    <FormTextInput
                        name={`authorized[${index}].authorizedPerson`}
                        label="Name"
                        placeholder="Name"
                        form={control}
                    />
                    <FormTextInput
                        name={`authorized[${index}].authorizedEmail`}
                        label="Email"
                        placeholder="Email"
                        form={control}
                    />
                    <FormTextInput
                        name={`authorized[${index}].authorizedPhone`}
                        label="Phone"
                        placeholder="Phone"
                        form={control}
                    />
                    <FormTextInput
                        name={`authorized[${index}].authorizedTitle`}
                        label="Title"
                        placeholder="Title"
                        form={control}
                    />
                    <Button type="button" onClick={() => remove(index)}>Remove</Button>
                </div>
            ))}
            <Button type="button" onClick={() => append({
                authorizedPerson: "",
                authorizedEmail: "",
                authorizedPhone: "",
                authorizedTitle: ""
            })}>
                Add Authorized Person
            </Button>
        </Card>
    );
};


