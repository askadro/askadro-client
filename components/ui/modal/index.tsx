import React from 'react';
import {SelectModal} from "./SelectModal";
import {SelectModalTable} from "./SelectModalTable";
import {MainModal} from "@/components/ui/modal/MailModal";

const Modal = (props: any) => {
    const {select,users,mail} = props
    let component = null
    if (select) {
        component = <SelectModal {...props} />
    }
    if (users) {
        component = <SelectModalTable {...props} />
    }
    if (mail) {
        component = <MainModal {...props} />
    }
    return component

};

export default Modal;