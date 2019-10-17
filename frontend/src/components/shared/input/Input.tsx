import React from 'react';

export const Input = ({onChange, label, value}: { onChange?: any, label?: string, value?: string }) => {
    return (
        <div style={{display: 'flex'}}>
            <span style={{flex: '0 0 auto'}}>{label} </span>
            <input style={{flex: '1 1 0px'}} value={value || ''} onChange={onChange}/>
        </div>
    )
}