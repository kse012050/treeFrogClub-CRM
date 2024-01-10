import React, { useState } from 'react';

export default function DropBox({children, title, arrow}) {
    const [dropBox, setDropBox] = useState(false);
    return (
        <div className='dropBox'>
            <button onClick={()=>setDropBox((value)=>!value)} className={arrow ? (dropBox ? 'arrow active': 'arrow') : ''}>{title}</button>
            {dropBox && children}
        </div>
    );
}

