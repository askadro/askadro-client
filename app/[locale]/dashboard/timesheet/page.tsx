"use client"

import React from 'react';
import useRoute from "@/hooks/useRoute";
import {Button} from "@/components/ui/button";

const Page = () => {
    const route = useRoute()
    return (
        <div>
           <Button onClick={(e)=>route(e,`new/${"5"}`)}>go new page</Button>
        </div>
    );
};

export default Page;