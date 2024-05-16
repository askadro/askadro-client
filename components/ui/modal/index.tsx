import React from 'react';
import {SelectModal} from "@/components/ui/modal/SelectModal";

const Modal = (props: any) => {
    const {select} = props
    let component = null
    if (select) {
        component = <SelectModal {...props} />
    }
    return component

};

export default Modal;