import React from 'react';
import {SelectModal} from "./SelectModal";
import {SelectModalTable} from "./SelectModalTable";

const Modal = (props: any) => {
    const {select,users} = props
    let component = null
    if (select) {
        component = <SelectModal {...props} />
    }
    if (users) {
        component = <SelectModalTable {...props} />
    }
    return component

};

export default Modal;