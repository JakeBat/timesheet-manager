import React from "react";
import './CredentialInput.css'

export const CredentialInput = ({inputTitle, onChangeHandler}: {inputTitle: string, onChangeHandler: Function}) => {
    return (
        <div className='input'>
            <div className='input-title' >{inputTitle}</div>
            <input className='input-field' onChange={(event) => {onChangeHandler(event)}}/>
        </div>
    )
};

export default CredentialInput;