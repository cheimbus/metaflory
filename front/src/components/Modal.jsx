import React from "react"
export default function Modal({name, open, children}){

    return (
        <div className={open? `open modal ${name}` :`modal ${name}`}>
            {children}
        </div>
    );
}