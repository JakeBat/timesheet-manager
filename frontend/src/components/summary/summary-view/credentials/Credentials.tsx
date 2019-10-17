import React from 'react';
import './Credentials.css'
import CredentialInput from "./credentials-input/CredentialInput";


export const Credentials = ({company, userOnChange, passOnChange}: { company: string, userOnChange: (event: any) => void, passOnChange: (event: any) => void }) => {
    return (
        <div className='credential' style={{}}>
            <div className='company-title'>{company}</div>
            <CredentialInput inputTitle={'Username:'} onChangeHandler={userOnChange}/>
            <CredentialInput inputTitle={'Password:'} onChangeHandler={passOnChange}/>
        </div>
    )
};

export default Credentials;