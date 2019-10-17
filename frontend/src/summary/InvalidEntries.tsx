import React from 'react'
import { Button } from '../shared';
export const InvalidEntries = ({closeModal}:{closeModal:Function}) => (
    <div>
        <div style={{display:'flex',fontSize:'28px', justifyContent:'center', alignItems:'center', height:'500px'}}>Please make sure all entries have a start time, end time, issue and comment.</div>
        <div style={{display:'flex', justifyContent:'center'}}><Button text="Close" fontSize='24px' onClick={closeModal}/></div>
    </div>
)