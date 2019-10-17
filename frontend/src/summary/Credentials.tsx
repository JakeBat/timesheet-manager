import React from 'react';

export const Credentials = ({company, userOnChange, passOnChange}:{company:string, userOnChange:(event:any) => void, passOnChange:(event:any) => void}) => {
    return (
            <div style={{display:'flex', flexDirection:'column', flex:'0 0 40%', fontSize:'18px', padding:'15px', border:'1px solid black', borderRadius:'5px', color:'white', background:'#5d2061' ,justifyContent:'center'}}>
                <div style={{width:'100%', marginBottom:'10px', fontSize:'20px'}}>{company}</div>
                <div style={{display:'flex', marginBottom:'5px'}}>
                    <div style={{fontWeight:600, flex:'0 0 100px'}}>Username:</div>
                    <input style={{flex:'1 1 0px'}} onChange={userOnChange}/>
                </div>
                <div style={{display:'flex', marginBottom:'5px'}}>
                    <div style={{fontWeight:600, flex:'0 0 100px'}}>Password:</div>
                    <input style={{flex:'1 1 0px'}} onChange={passOnChange}/>
                </div>
            </div>
    )
}