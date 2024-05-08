"use client"

import React from 'react';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {AddUserForm, UserTable} from "@business";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

const Page = () => {


    return (
        <Tabs defaultValue="user-list" className="">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user-list">Personel Listesi</TabsTrigger>
                <TabsTrigger value="new-user">Personel Ekle</TabsTrigger>
            </TabsList>
            <TabsContent value="user-list">
                <UserTable />
            </TabsContent>
            <TabsContent value="new-user">
                <AddUserForm/>
            </TabsContent>
        </Tabs>
    );
};

export default Page;